import './App.css';
import React, { useState, useEffect } from "react";
import { clothes } from './Assets/clothes';
import { PieChart } from 'react-minimal-pie-chart';
import { generatePath } from 'react-router';

function ClothesMini() {
  const [errorMsg, setErrorMsg] = useState("");
  const [clothesObject, setClothesObject] = useState([]);
  const setState = useState({});

  // Only run queries on page load rather than comnponent render
  // Probably a better way to do this
  useEffect(() => {
    createClothesObject(clothes)
  }, []);

  function createClothesObject(rawData) {
    let items = rawData.payload;

    let totals = {}
    let data = []
    let colourNum = 0
    for (let clothesItem in items) {
      totals[items[clothesItem].clothes] = (totals[[items[clothesItem].clothes]] ?? 0) + 1;
    }


    for (let item in totals) {
      data.push({
        title: item,
        value: totals[item],
        color: generateRandomColour(colourNum)
      })
      colourNum += 1
    }
    setClothesObject(data)

  }

  function generateRandomColour(pick) {

    // manual colours less ugly for now
    let customColours = [
      "#003f5c",
      "#58508d",
      "#bc5090",
      "#ff6361",
      "#ffa600",
      "#aaaaaa"
    ]
    return customColours[pick]

    // Random colours for larger datasets 

    // let h = randomInt(0, 360);
    // let s = randomInt(75, 100);
    // let l = randomInt(65, 80);

    // return `hsl(${h},${s}%,${l}%)`;

  }

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };



  return (
    <div className="Clothes">
      <div className="ContainerTitle">Clothes</div>

      <PieChart className="ClothesPie"
        data={clothesObject}
        />
      <p>{errorMsg}</p>
    </div>


  );
}

export default ClothesMini;
