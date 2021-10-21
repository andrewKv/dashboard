import './App.css';
import React, { useState, useEffect, useContext } from "react";
import { NewsContext } from "./Context";
import Axios from "axios";


function Teams () {
  

  return (
    <div className="Teams">
      <p>{errorMsg}</p>
    </div>


  );
}

export default Teams;
