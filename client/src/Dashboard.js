import './App.css';
import React, { useContext, useEffect } from "react";
import { Redirect } from 'react-router';
import { LoginContext, UsernameContext } from "./Context";
import Weather from "./Weather";
import NewsMini from './NewsMini';
import TeamsMini from './TeamsMini';
import PhotosMini from './PhotosMini';

function Dashboard() {
  const { loggedIn, changeLoggedIn } = useContext(LoginContext);
  const { user, changeUserName } = useContext(UsernameContext);
  // handle refresh and auth
  const pageVisited = sessionStorage.getItem("authorised") ? true : false
  
  useEffect(() => {
    if (user === "") {
      changeUserName(sessionStorage.getItem("username"))
    }
  }, []);

  if (!loggedIn && !pageVisited) {
    return <Redirect to="/"></Redirect>
  }

  function logOut() {
    changeLoggedIn(false);
    sessionStorage.clear();
  }


  return (
    <div className="Dashboard">
      
        <a className="Logout" href='#' onClick={logOut}>Log Out</a>

      <div className="MainTitle">Good Day {user}</div>
      
      <div className="MainGrid">
        <div className="item1">
          <Weather />
        </div>
        <div className="item2">
          <NewsMini />
        </div>
        <div className="item3">
          <TeamsMini />
        </div>
        <div className="item4">
        <PhotosMini />
        </div>
        
        <div className="item5">Tasks</div>
        <div className="item6">Clothes</div>
      </div>

    </div>


  );
}


export default Dashboard;
