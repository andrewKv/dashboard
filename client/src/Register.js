import './App.css';
import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { LoginContext, UsernameContext } from "./Context";
import Axios from "axios";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [addVisible, setAddVisible] = useState(true);
  const { changeLoggedIn } = useContext(LoginContext);
  const { changeUserName } = useContext(UsernameContext);

  let history = useHistory();


  function handleSubmit(event) {

    // photo add
    // check valid email
    if (username.length > 0 && password.length > 0 && password === passwordConfirm) {
      Axios.post("http://localhost:3001/Register", {
        username: username,
        password: password,
        email: email,
        photo: userPhoto
      }).then((response) => {
        if (response.data.error) {
          let userMessage = "Registration Error"
          switch (response.data.error.code) {
            case "ER_DUP_ENTRY":
              userMessage += " Username already in use!"
            default:
              userMessage += response.data.error.code
          }
          setErrorMsg(userMessage)
        }
        else {
          changeLoggedIn(true);
          changeUserName(username);
          sessionStorage.setItem("authorised", true)
          sessionStorage.setItem("username", username)
          history.push('/Dashboard')
        }
      })
    }
    else {
      let userMessage = "Form Error"
      // case switch for each option
      setErrorMsg(userMessage)
    }
  }

  function changePhoto(e) {
    setUserPhoto(e.target.files[0].name)
    setAddVisible(false)
  }

  return (
    <div className="Login">
      <h1 className="MainTitle">Dev Challenge</h1>
      <div className="RowWrapper">
        <input type="text" placeholder="UserName..." onChange={(e) => { setUsername(e.target.value) }} />
        <input type="text" placeholder="Email..." onChange={(e) => { setEmail(e.target.value) }} />
      </div>
      <div className="RowWrapper">
        <input type="text" placeholder="Password..." onChange={(e) => { setPassword(e.target.value) }} />
        <input type="text" placeholder="Confirm Password..." onChange={(e) => { setpasswordConfirm(e.target.value) }} />
      </div>

      <label className={"AddIcon" + addVisible ? "" : " hide"}>
        <span className="PhotoAdd User">
          <input onChange={(e) => { changePhoto(e) }} type="file" accept="image/*" name="image" />
          <img className="PhotoAdd User" src={process.env.PUBLIC_URL + userPhoto} ></img>
        </span>
      </label>

      <Button className="Login Button Signup" size="lg" type="submit" onClick={handleSubmit}>
        Register
      </Button>

      <p>
        {errorMsg}
      </p>

    </div>
  );
}

export default Register;
