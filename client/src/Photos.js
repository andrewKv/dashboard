import './App.css';
import React, { useState, useEffect, useContext, Item } from "react";
import { useHistory } from "react-router-dom";
import { UsernameContext, PhotoContext } from "./Context";
import Axios from "axios";

function Photos() {
  const [errorMsg, setErrorMsg] = useState("");

  const [recentPhotos, setRecentPhotos] = useState([])
  const { user, changeUserName } = useContext(UsernameContext);
  let history = useHistory();

  useEffect(() => {
    if (user === "") {
      changeUserName(sessionStorage.getItem("username"))
    }
    getPhotos()
  }, []);

  // Assume all photos in public folder, force with multer if time
  // Photos with the same name can be uploaded, returns most recent
  function getPhotos() {
    Axios.post("http://localhost:3001/RecentPhotos", {
      username: user
    }).then((response) => {
      if (response.data.error) {
        setErrorMsg("Couldn't get photos: " + response.data.error)
      }
      else {
        let photos = response.data
        setRecentPhotos(photos.map((p) =>
          <div className="Photo Item">
            <img key={photos.indexOf(p)} src={process.env.PUBLIC_URL + p.photolink} alt={p.photolink} className="Photo Image" />
            <button className="ImageDelete" data-id={p.photolink} onClick={(e) => { deletePhoto(e) }}>Delete</button>
          </div>
        ))
      }
    })
  }


  function deletePhoto(event) {
    let deleteImage = event.target.attributes[1].value
    Axios.post("http://localhost:3001/DeleteImage", {
      username: user, photo: deleteImage
    }).then((response) => {
      if (response.data.error) {
        setErrorMsg("Delete error: " + response.data.error)
      } else {
        getPhotos()
      }
    })
  }

  function addPhoto(e) {
    // Add file to public folder would go here
    const fileName = e.target.files[0].name
    Axios.post("http://localhost:3001/PostImageDB", {
      fileName: fileName,
      username: user,
    }).then((response) => {
      if (response.data.error) {
        setErrorMsg("Couldn't add photo: " + response.data.error.sqlMessage)
      }
      else {
        // Redsiplay photos
        getPhotos()
      }
    })
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
      <ul className="PhotoMainGrid">
        <div className="Photo Item1">
          <label className="PhotoAdd">
            <span className="AddIcon">
              <input onChange={(e) => { addPhoto(e) }} type="file" accept="image/*" name="image" />
            </span>
          </label>
        </div>
        {recentPhotos}
      </ul>
      <p>
        {errorMsg}
      </p>
    </div>
  );
}

export default Photos;
