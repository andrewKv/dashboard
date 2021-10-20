import './Login.css';
import React, { useContext, useState } from "react";
import { Redirect } from 'react-router';
import {LoginContext, UsernameContext} from "./Context";

function Dashboard() {
    const {loggedIn, changeLoggedIn} = useContext(LoginContext);
    let {user, changeUserName} = useContext(UsernameContext);
    
    // handle refresh and auth
    const pageVisited = sessionStorage.getItem("authorised")?true:false
    
    if(!loggedIn && !pageVisited){
        return <Redirect to="/"></Redirect>
    }

    if (user == ""){
        changeUserName(sessionStorage.getItem("username"))
    }
    
    function logOut(){
      changeLoggedIn(false);
      sessionStorage.clear();
    }
  return (
    <div className="Dashboard">
      <h1>Good Day {user}!</h1>

      <div className="Logout">
        <a href='#' onClick={logOut}>Log Out</a>
      </div>










    </div>


  );
}

export default Dashboard;
