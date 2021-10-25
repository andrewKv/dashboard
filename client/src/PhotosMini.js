import './App.css';
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UsernameContext } from "./Context";
import Axios from "axios";

function PhotosMini() {
  const [errorMsg, setErrorMsg] = useState("");
  const [recentPhotos, setRecentPhotos] = useState([])
  const { user, changeUserName } = useContext(UsernameContext);

  let history = useHistory();
  function showPhotos() {
    history.push('/Photos')
  }

  useEffect(() => {
    // select first 4 entries, turn this to helper function?
    // Issue exporting
    if (user === "") {
      changeUserName(sessionStorage.getItem("username"))
    }
    Axios.post("http://localhost:3001/RecentPhotos", {
      username: user
    }).then((response) => {
      if (response.data.error) {
        setErrorMsg("Couldn't get photos: " + response.data.error)
      }
      else {
        let photos = response.data
        setRecentPhotos((photos.slice(0,4)).map((p) =>
            <img key={photos.indexOf(p)} src={process.env.PUBLIC_URL + p.photolink} alt={p.photolink} className="Photo Item Mini" />
        ))
      }
    })
  }, []);

  return (
    <div className="PhotosMini" onClick={showPhotos}>
      <div className="ContainerTitle">Photos</div>
      <ul className="PhotoMainGrid Mini">
        {recentPhotos}
      </ul>

      <p>{errorMsg}</p>

    </div>
  );
}

export default PhotosMini;
