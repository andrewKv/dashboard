import './App.css';
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";


function Teams () {
  const [errorMsg, setErrorMsg] = useState("");
  let history = useHistory();

  function homeRequest(){
    history.push('/Dashboard')
  }

  return (
    <div className="Sports" onClick={homeRequest}>
      <p>click me!</p>
      <p>{errorMsg}</p>
    </div>


  );
}

export default Teams;
