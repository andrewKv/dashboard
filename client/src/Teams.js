import './App.css';
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TeamsContext } from "./Context"

function Teams () {
  const [errorMsg, setErrorMsg] = useState("");
  const { currentTeam, changeCurrentTeam } = useContext(TeamsContext);
  let history = useHistory();

  function homeRequest(){
    history.push('/Dashboard')
  }

  return (
    <div className="Sports" onClick={homeRequest}>
      
      <input type="text" placeholder="UserName..." onChange={(e)=> {changeCurrentTeam(e.target.value)}}/>
      <p>click me!</p>
      <p>{errorMsg}</p>
    </div>


  );
}

export default Teams;
