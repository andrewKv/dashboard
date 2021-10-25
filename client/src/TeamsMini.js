import './App.css';
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TeamsContext } from "./Context"

function TeamsMini() {
  const [errorMsg ] = useState("");
  const { selectedTeam } = useContext(TeamsContext);

  let history = useHistory();
  function showTeams(){
    history.push('/Teams')
  }

  return (
    <div className="TeamsMini" onClick={showTeams}>
      <div className="ContainerTitle">Sport</div>
      <h2> {selectedTeam.name}</h2>

      <p>
        {selectedTeam.message}
      </p>

      <p>{errorMsg}</p>

    </div>
  );
}

export default TeamsMini;
