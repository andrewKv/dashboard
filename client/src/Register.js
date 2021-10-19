import './Login.css';
import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { LoginContext, UsernameContext } from "./Context";
import Axios from "axios";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loggedIn, changeLoggedIn } = useContext(LoginContext);
  const {user, changeUserName} = useContext(UsernameContext);
  let history = useHistory();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }
  function handleSubmit(event) {
    event.preventDefault();

    
    Axios.post("https:http://localhost:3001/Register", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
    })

    changeLoggedIn(true);
    changeUserName(username);
    localStorage.setItem("authorised", true)
    localStorage.setItem("userName", username)
    history.push('/Dashboard')
  }


  return (
    <div className="Login">
      <input type="text" placeholder="UserName..." />
      <input type="text" placeholder="Email..." />
      <input type="text" placeholder="Password..." />
      <input type="text" placeholder="Confirm Password..." />

      <Button className="submit" size="lg" type="submit" disabled={!validateForm()}>
        Login
      </Button>

    </div>
  );
}

export default Register;
