import './App.css';
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { NewsContext } from "./Context";
import { useHistory } from "react-router-dom";

function TeamsMini() {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div className="TeamsMini">
      <p>{errorMsg}</p>

    </div>
  );
}

export default TeamsMini;
