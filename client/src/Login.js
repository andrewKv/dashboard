import './App.css';
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { LoginContext, UsernameContext } from "./Context";

function Login() {
  const { changeLoggedIn } = useContext(LoginContext);
  const { changeUserName } = useContext(UsernameContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");


  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();

    // Authorise from db
    if (username.length > 0 && password.length > 0) {
      Axios.post("http://localhost:3001/Login", {
        username: username,
        password: password,
      }).then((response) => {
        if (response.data.error) {
          setErrorMsg("Login Error")
        }
        else {
          if (response.data === "Invalid password") {
            setErrorMsg("Invalid password")
          }
          else {
            changeLoggedIn(true);
            changeUserName(username);
            sessionStorage.setItem("authorised", true)
            sessionStorage.setItem("username", username)
            history.push('/Dashboard')
          }
        }
      })
    }
    else {
      // case switch for each option
      setErrorMsg("Form Error")
    }
  }
  function handleRegister(event) {
    event.preventDefault();
    history.push('/Register')
  }

  return (
    <div className="Login">
      <h1 className="MainTitle">Dev Challenge</h1>
      <div className="RowWrapper">
        <input type="text" placeholder="Username..." onChange={(e) => { setUsername(e.target.value) }} />
        <input type="password" placeholder="Password..." onChange={(e) => { setPassword(e.target.value) }} />
      </div>
      <Button className="Login Button" onClick={handleSubmit} size="lg" type="submit">
        Login
      </Button>

      <div className="SignupWrapper">
        New to the challenge? <a className="SignUp" href='#' onClick={handleRegister}>Sign Up</a>
      </div>


      <p>
        {errorMsg}
      </p>
    </div>


  );
}

export default Login;
