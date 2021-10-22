import './App.css';
import React, { useState, useEffect, useContext } from "react";
import { NewsContext } from "./Context";
import { useHistory } from "react-router-dom";
import Axios from "axios";


function News() {
  const setState = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const { newsObj, changeNewsObj } = useContext(NewsContext);
  let history = useHistory();

  function homeRequest(){
    history.push('/Dashboard')
  }

  // Read main story from link
  useEffect(() => {
    if (!(newsObj.article)) {
      Axios.post("http://localhost:3001/NewsStory", { link: newsObj.link }).then((response) => {
        if (response.data.error) {
          setErrorMsg("Article not found")
        }
        else {
          changeNewsObj({ link: newsObj.link, headline: newsObj.headline, article: response.data.text, image: response.data.image })
        }
      })
    }
  }, []);

  return (
    <div className="News" onClick={homeRequest}>
      <div className="MainTitle NewsTitle">News</div>
      <div className="NewsWrapper">
        <div className="NewsImageContainer">
          <img src={newsObj.image} alt={newsObj.headline} />
        </div>
        <h2 className="NewsHeadline">{newsObj.headline}</h2>
      </div>
        <div className="NewsBody">{newsObj.article}</div>
      <p>{errorMsg}</p>
    </div>


  );
}

export default News;
