import './App.css';
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

function PhotosMini() {
  const [errorMsg, setErrorMsg] = useState("");

  let history = useHistory();
  function showPhotos(){
    history.push('/Photos')
  }

  return (
    <div className="PhotosMini" onClick={showPhotos}>
      <div className="ContainerTitle">Photos</div>

      <p>
        Photos
      </p>

      <p>{errorMsg}</p>

    </div>
  );
}

export default PhotosMini;
