import './App.css';
import React, { useState, useEffect, useContext, Item } from "react";
import { useHistory } from "react-router-dom";
import { UsernameContext } from "./Context";
import Axios from "axios";

function Photos() {
  const [errorMsg, setErrorMsg] = useState("");
  const [recentPhotos, setRecentPhotos] = useState([])
  const { user, changeUserName } = useContext(UsernameContext);

  let history = useHistory();

  // function getPhotos(){
  //   Axios.get("http://localhost:3001/NewsStory").then((response) => {
  //       if (response.data.error) {
  //         setErrorMsg("Article not found")
  //       }
  //       else {
  //         //setRecentPhotos(uniqueTeamsBeaten.map((t) => <div> {t} </div>))
  //         setRecentPhotos()
  //       }
  //     })
  // } //setRecentPhotos(uniqueTeamsBeaten.map((t) => <div> {t} </div>))
  // Fetch 6 newest photos
  useEffect(() => {
    if (user === "") {
      changeUserName(sessionStorage.getItem("username"))
      //
    }
  }, []);

  function addPhoto(e) {
    const fileName = e.target.files[0].name
    console.log(fileName)

    Axios.post("http://localhost:3001/PostImage", {
      fileName: fileName,
      username: user,
    }).then((response) => {
      if (response.data.error) {
        setErrorMsg("Couldn't add photo")
      }
      else {
        console.log("added!")
      }
    })

    // Re get photos to display newest
    // getPhotos()
  }

  function homeRequest() {
    history.push('/Dashboard')
  }


  // on click add upload picture
  // resize and show 6 most recent pictures from query
  // store older pictures in database
  // list of 4 recent pictures in photo context
  return (
    <div className="Photos">
      <div className="MainTitle" onClick={homeRequest}>Photos</div>

      <div className="PhotoMainGrid">
        <input onChange={(e) => { addPhoto(e) }} className="Photo Add" type="file" accept="image/*" />
        <ul>
          {recentPhotos}
        </ul>
      </div>
    </div>
  );
}

export default Photos;
