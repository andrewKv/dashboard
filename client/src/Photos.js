import './App.css';
import React, { useState, useEffect, useContext, Item  } from "react";
import { useHistory } from "react-router-dom";
import { TeamsContext } from "./Context";
import Axios from "axios";

function Photos() {
  const [errorMsg, setErrorMsg] = useState("");
  
  let history = useHistory();

  function homeRequest() {
    history.push('/Dashboard')
  }

  return (
    <div className="Photos">
      <div className="MainTitle" onClick={homeRequest}>Photos</div>
    </div>
  );
}

export default Photos;
