import './App.css';
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TeamsContext } from "./Context"

function TeamsMini() {
  const [errorMsg, setErrorMsg] = useState("");
  const { selectedTeam, changeSelectedTeam } = useContext(TeamsContext);

  let history = useHistory();
  function showTeams(){
    history.push('/Teams')
  }

  return (
    <div className="TeamsMini" onClick={showTeams}>
      <div className="ContainerTitle">Sport</div>
      <h2> {selectedTeam}</h2>

      <p>
        Click for updates
      </p>

      <p>{errorMsg}</p>

    </div>
  );
}

export default TeamsMini;
