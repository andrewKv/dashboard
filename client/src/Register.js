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
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const { loggedIn, changeLoggedIn } = useContext(LoginContext);
  const { user, changeUserName } = useContext(UsernameContext);

  let history = useHistory();


  function handleSubmit(event) {
    event.preventDefault();
    // check valid email
    if (username.length > 0 && password.length > 0 && password === passwordConfirm) {
      Axios.post("http://localhost:3001/Register", {
        username: username,
        password: password,
        email: email,
      }).then((response) => {
        if (response.data.error){
          let userMessage = "Registration Error"
          switch (response.data.error.code){
            case "ER_DUP_ENTRY":
              userMessage = "Username already in use!"
          }
          setErrorMsg(userMessage)
        }
        else{
          changeLoggedIn(true);
          changeUserName(username);
          sessionStorage.setItem("authorised", true)
          sessionStorage.setItem("username", username)
          history.push('/Dashboard')
        }
      })
    }
    else{
      let userMessage = "Form Error"
      // case switch for each option
      setErrorMsg(userMessage)
    }
  }

  return (
    <div className="Login">
      <input type="text" placeholder="UserName..." onChange={(e)=> {setUsername(e.target.value)}}/>
      <input type="text" placeholder="Email..." onChange={(e)=> {setEmail(e.target.value)}}/>
      <input type="text" placeholder="Password..." onChange={(e)=> {setPassword(e.target.value)}}/>
      <input type="text" placeholder="Confirm Password..." onChange={(e)=> {setpasswordConfirm(e.target.value)}}/>

      <Button className="submit" size="lg" type="submit" onClick={handleSubmit}>
        Register
      </Button>

      <p>
        {errorMsg}
      </p>

    </div>
  );
}

export default Register;
