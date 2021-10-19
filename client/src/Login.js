import './Login.css';
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import {LoginContext, UsernameContext} from "./Context";

function Login() {
  const {loggedIn, changeLoggedIn} = useContext(LoginContext);
  const {user, changeUserName} = useContext(UsernameContext);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();

    // Authorise from db
    changeLoggedIn(true);
    changeUserName(username);
    localStorage.setItem("authorised", true)
    localStorage.setItem("username", username)
    history.push('/Dashboard')
  }
  function handleRegister(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <input type="text" placeholder="UserName..." onChange={(e)=> {setUsername(e.target.value)}} />
      <input type="text" placeholder="Password..." onChange={(e)=> {setPassword(e.target.value)}} />

      <Button className="submit" onClick={handleSubmit} size="lg" type="submit">
        Login
      </Button>


      <div className="SignUp">
        <a href='#' onClick={handleRegister}>Sign Up</a>
      </div>
    </div>
  );
}

export default Login;
