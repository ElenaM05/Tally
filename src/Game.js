/*import React, { useState } from "react";
import SnakeAndLadder from "./SnakeAndLadder"; // Snake and Ladder Game
import FinanceQuiz from "./FinanceQuiz"; // Finance Quiz
import "./Game.css";


const Game = () => {
  const [activeGame, setActiveGame] = useState("");

  return (
    <div className="game-container">
      <h2>Game Section</h2>
      <div>
        <button onClick={() => setActiveGame("snakeLadder")}>Play Snake and Ladder</button>
        <button onClick={() => setActiveGame("quiz")}>Take Finance Quiz</button>
      </div>
      {activeGame === "snakeLadder" && <SnakeAndLadder />}
      {activeGame === "quiz" && <FinanceQuiz />}
    </div>
  );
};*/
import React, { useState } from "react";
import SnakeAndLadder from "./SnakeAndLadder"; // Snake and Ladder Game
import CoinCatcher from "./CoinCatcher"; // CoinCatcher Game
import "./Game.css";

const Game = () => {
  const [activeGame, setActiveGame] = useState("");

  return (
    <div className="game-container">
      <h2>Game Section</h2>
      <div>
        <button onClick={() => setActiveGame("snakeLadder")}>Play Snake and Ladder</button>
        <button onClick={() => setActiveGame("coinCatcher")}>Play Coin Catcher</button>
      </div>
      
      {activeGame === "snakeLadder" && <SnakeAndLadder />}
      {activeGame === "coinCatcher" && <CoinCatcher />}
    </div>
  );
};

export default Game;


