import './App.css';
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

function TeamsMini() {
  const [errorMsg, setErrorMsg] = useState("");

  let history = useHistory();
  function showTeams(){
    history.push('/Teams')
  }

  return (
    <div className="TeamsMini" onClick={showTeams}>
      <div className="ContainerTitle">Teams</div>

      <p>{errorMsg}</p>

    </div>
  );
}

export default TeamsMini;
