import './App.css';
import React, { useState, useEffect } from "react";
import Axios from "axios";

function Weather() {
  const [errorMsg, setErrorMsg] = useState("");
  const [temp, setTemp] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function showData(weather){
    setWeather(weather.weather[0].main)
    setCity(weather.name)
    setTemp(Math.ceil(weather.main.temp))
  }
  
  function getWeather(pos) {
    const secretKey = 'ca2477500cmshbb2e93507cdecfdp185023jsn576bc71ae93f'
    
    const weatherOptions = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      params: {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        id: '2172797',
        lang: 'null',
        units: 'metric',
        mode: 'json'
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': secretKey
      }
    };

    Axios.request(weatherOptions).then((response) => {
      showData(response.data)
    }).catch((error) => {
      setErrorMsg("Error retrieving weather: ", error);
    });
  }

  function positionError(err) {
    setErrorMsg("Error finding position")
  }

  // Only run queries on page load rather than comnponent render
  // Probably a better way to do this
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getWeather, positionError, locationOptions);
  }, []);

  return (
    <div className="Weather">
      <div className="ContainerTitle">Weather</div>
      <p>{temp}</p>
      <p>{city}</p>
      <p>{weather}</p>
      
      <p>{errorMsg}</p>
    </div>


  );
}

export default Weather;
