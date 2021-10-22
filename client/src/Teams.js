import './App.css';
import React, { useState, useEffect, useContext, Item  } from "react";
import { useHistory } from "react-router-dom";
import { TeamsContext } from "./Context";
import Axios from "axios";

function Teams() {
  const [errorMsg, setErrorMsg] = useState("");
  const { currentTeam, changeSelectedTeam } = useContext(TeamsContext);
  const [teamList, setTeamList] = useState([])
  const [teamsBeaten, setTeamsBeaten] = useState([])
  


  let history = useHistory();

  function homeRequest() {
    history.push('/Dashboard')
  }

  // Convert CSV to Json once
  useEffect(() => {
    Axios.get("http://localhost:3001/TeamFile").then((response) => {
      if (response.data.error) {
        setErrorMsg("Error retreiving teams")
      }
      else {
        setTeamList(response.data)
      }
    }, [])
  }, []);

  function searchTeam(inputTeam) {
    changeSelectedTeam(inputTeam)
    let teamsBeat = []
    // Search for beaten
    if (teamList.length) {
      for (const team in teamList) {
        // if this team is the home team and they won, or if away and won
        if ((teamList[team].HomeTeam === inputTeam && teamList[team].FTR === "H") || 
        (teamList[team].AwayTeam === inputTeam && teamList[team].FTR === "A")){
          // Add the team that lost to the list
          teamsBeat.push(teamList[team].HomeTeam === inputTeam ? teamList[team].AwayTeam : teamList[team].HomeTeam)
        }
      }
    }
    let uniqueTeamsBeaten = [...new Set(teamsBeat)];
    // Could include score, duplicate issue? 
    setTeamsBeaten(uniqueTeamsBeaten.map((t) => <li className="TeamItem" key={uniqueTeamsBeaten.indexOf(t)}> {t} </li>))
  }
  

  return (
    <div className="Sports">
      <div className="MainTitle NewsTitle" onClick={homeRequest}>Champions league challenge</div>
      <input className="Input TeamInput" type="text" placeholder="Input winning team..." onChange={(e) => { searchTeam(e.target.value) }} />
      <div className="TeamsBeaten Header" onClick={homeRequest}>There are the teams you won against:</div>
      <ul className="TeamsBeaten">
        {teamsBeaten}
      </ul>
      <p>{errorMsg}</p>
    </div>


  );
}

export default Teams;
