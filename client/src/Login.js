import './Login.css';
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import Axios from "axios";
import {LoginContext, UsernameContext} from "./Context";

function Login() {
  const {loggedIn, changeLoggedIn} = useContext(LoginContext);
  const {user, changeUserName} = useContext(UsernameContext);
  
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
        if (response.data.error){
          setErrorMsg("Login Error")
        }
        else{
          console.log(response)
          if (response == "Invalid password"){
            setErrorMsg("Invalid password")
          }
          else{
            changeLoggedIn(true);
            changeUserName(username);
            sessionStorage.setItem("authorised", true)
            sessionStorage.setItem("username", username)
            history.push('/Dashboard')
          }
        }
      })
    }
    else{
      // case switch for each option
      setErrorMsg("Form Error")
    }


    changeLoggedIn(true);
    changeUserName(username);
    sessionStorage.setItem("authorised", true)
    sessionStorage.setItem("username", username)
    history.push('/Dashboard')
  }
  function handleRegister(event) {
    event.preventDefault();
    history.push('/Register')
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


      <p>
        {errorMsg}
      </p>
    </div>

    
  );
}

export default Login;
