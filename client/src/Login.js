import './Login.css';
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signUp(){
    Axios.post("https:http://localhost:3001/SignUp",{
      username: username,
      password: password,
    }).then((response) =>{
    console.log(response);
  })
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  function handleRegister(event) {
    event.preventDefault();
  }



  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="submit" size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>

      </Form>

    <div className="SignUp">
      <a href='#' onClick={handleRegister}>Sign Up</a>
    </div>
    </div>
  );
}

export default Login;
