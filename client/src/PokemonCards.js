import "./App.css";
import React, { useState } from "react";
import Axios from "axios";

export default function PokemonCards() {
  const [pokemonList, setPokemonData] = useState([]);
  const gridSize = 10;

  // @todo prevent duplicates
  function letsGetPokemon() {
    for (let i = 0; i < gridSize; i++) {
      Axios.get("http://localhost:3001/Pokemon").then((response) => {
        const shinyChance = Math.floor(Math.random() * (8192 - 1));
        setPokemonData((pokemonList) => [
          ...pokemonList,
          {
            name: response.data.forms[0].name,
            image:
              shinyChance === 0
                ? response.data.sprites.front_shiny
                : response.data.sprites.front_default,
          },
        ]);
      });
    }
  }
  function newCard() {
    letsGetPokemon();
  }

  function deleteCard(index) {
    setPokemonData((pokemonList) => [...pokemonList.splice(index, 1)]);
  }

  return (
    <div>
      <header>
        <h1 className="header-element">Guess Who</h1>
        <nav>
          <ul>
            <li>
              <a className="header-element" onClick={newCard} href="#">
                Generate Grid
              </a>
            </li>
          </ul>
        </nav>
      </header>
      {/* @todo remove cards onClick */}
      <div className="grid-container">
        {pokemonList.length > 0 &&
          pokemonList.map((pokemon, index) => (
            <div className="card">
              <img
                src={pokemon.image}
                className="pokemonImage"
                onClick={deleteCard(index)}
                alt="pokemon to display"
              />
              <div className="pokemonName">{pokemon.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
