import './App.css';
import React, { useContext, useState, useEffect } from "react";
import { Redirect } from 'react-router';
import { LoginContext, UsernameContext } from "./Context";
import Weather from "./Weather";
import NewsMini from './NewsMini';

function Dashboard() {
  const { loggedIn, changeLoggedIn } = useContext(LoginContext);
  const { user, changeUserName } = useContext(UsernameContext);
  // handle refresh and auth
  const pageVisited = sessionStorage.getItem("authorised") ? true : false

  if (!loggedIn && !pageVisited) {
    return <Redirect to="/"></Redirect>
  }

  if (user === "") {
    changeUserName(sessionStorage.getItem("username"))
  }

  function logOut() {
    changeLoggedIn(false);
    sessionStorage.clear();
  }


  return (
    <div className="Dashboard">
      <div className="Logout">
        <a href='#' onClick={logOut}>Log Out</a>
      </div>

      <div className="DashboardTitle">Good Day {user}</div>
      
      <div className="MainGrid">
        <div className="item1">
          <Weather />
        </div>
        <div className="item2">
          <NewsMini />
        </div>
        <div className="item3">Sport</div>
        <div className="item4">Photos</div>
        <div className="item5">Tasks</div>
        <div className="item6">Clothes</div>
      </div>

    </div>


  );
}


export default Dashboard;
