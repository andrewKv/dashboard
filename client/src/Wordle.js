import "./App.css";
import React, { useState, useEffect, useCallback } from "react";

export default function Wordle() {
  const guessSize = 5;
  const numberOfGuesses = 5;
  const word = "words";
  const [currentGuess, setCurrentGuess] = useState("".repeat(guessSize));
  const [allGuessedWords, setAllGuessedWords] = useState(
    Array(numberOfGuesses).fill(
      Array(guessSize).fill({ letter: "_", fill: "grey" })
    )
  );
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  console.log("***", allGuessedWords);
  // For all inputs on the page, expecting a,b,c...
  const handleAnyKeypress = useCallback(
    (event) => {
      console.log("***", event.key);
      // submit answer, calc yellow + green, move to next row
      if (event.key === "Enter" && currentGuessIndex >= guessSize) {
        console.log("*** calculating: ");
      }

      if (currentGuessIndex < guessSize) {
        setCurrentGuess(currentGuess + event.key);
        setCurrentGuessIndex(currentGuessIndex + 1);
        setAllGuessedWords((allGuessedWords[currentWordIndex] = currentGuess));
      }
    },
    [currentGuessIndex, currentGuess, currentWordIndex, allGuessedWords]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleAnyKeypress, false);

    return () => {
      document.removeEventListener("keydown", handleAnyKeypress, false);
    };
  }, [handleAnyKeypress]);

  const handleCardPressed = (event, key) => {
    const currentGuessArray = currentGuess.split("");
    currentGuessArray[currentGuessArray.indexOf(key)] = event.key;
    setCurrentGuess(currentGuessArray.join(""));
    console.log("***", currentGuess);
  };
  console.log("***", currentGuess);
  return (
    <div>
      <div className="grid-container-wordle">
        {allGuessedWords.map((currentWord) => {
          console.log("***", currentWord);
          return (
            <div>
              {currentWord.map((currentLetters) => {
                console.log("***", currentLetters);
                return (
                  <div>
                    {currentLetters.map((letter) => (
                      <input
                        className="card"
                        type="text"
                        value={letter.letter}
                        onKeyPress={(event) => handleCardPressed(event, letter)}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
