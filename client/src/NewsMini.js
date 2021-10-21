import './App.css';
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { NewsContext } from "./Context";
import { useHistory } from "react-router-dom";

function NewsMini() {
  const [errorMsg, setErrorMsg] = useState("");
  const [headline, setHeadline] = useState("");
  const [desc, setDesc] = useState("");
  const [state, setState] = useState({});


  const { newsObj, changeNewsObj  } = useContext(NewsContext);
  
  // at click change route to news component, pass relevant data, link for mainstory
  let history = useHistory();

  function showNews(){
    history.push('/News')
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/News", {}).then((response) => {
      if (response.data.error) {
        setErrorMsg("Login Error")
      }
      else {
        const topItem = response.data.rss.channel.item[0]
        setHeadline(topItem.title._cdata)
        setDesc(topItem.description._cdata)
        changeNewsObj({link: topItem.link._text, headline: topItem.title._cdata})
      }
    })
    return () => {
      setState({});
    }
  }, []);

  return (
    <div className="NewsMini" onClick={showNews}>
      <div className="ContainerTitle">News</div>
      <h3 className="NewsHeadLineMini">{headline}</h3>
      <h4 className="NewsDescriptionMini">{desc}</h4>
      <p>{errorMsg}</p>

    </div>
  );
}

export default NewsMini;
