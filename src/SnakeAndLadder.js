
import React, { useState } from "react";
import "./Game.css"; // Ensure correct styles

const SnakeAndLadder = () => {
  const [position, setPosition] = useState(1);
  const [message, setMessage] = useState("");

  // Snakes & Ladders Data
  const snakesAndLadders = [
    { start: 2, end: 38, type: "ladder" },
    { start: 7, end: 14, type: "ladder" },
    { start: 8, end: 31, type: "ladder" },
    { start: 15, end: 26, type: "ladder" },
    { start: 21, end: 42, type: "ladder" },
    { start: 28, end: 84, type: "ladder" },
    { start: 36, end: 44, type: "ladder" },
    { start: 46, end: 60, type: "ladder" },
    { start: 49, end: 11, type: "snake" },
    { start: 47, end: 26, type: "snake" },
    { start: 50, end: 5, type: "snake" },
    { start: 62, end: 19, type: "snake" },
    { start: 64, end: 60, type: "snake" },
    { start: 87, end: 24, type: "snake" },
    { start: 93, end: 73, type: "snake" },
    { start: 95, end: 75, type: "snake" },
    { start: 98, end: 78, type: "snake" },
  ];

  const rollDice = () => {
    if (position === 100) return; // Stop rolling if player has won

    const dice = Math.floor(Math.random() * 6) + 1;
    let newPosition = position + dice;
    if (newPosition > 100) newPosition = 100;

    // Check for snakes or ladders
    const snakeOrLadder = snakesAndLadders.find((item) => item.start === newPosition);

    if (snakeOrLadder) {
      newPosition = snakeOrLadder.end;
      setMessage(
        snakeOrLadder.type === "snake"
          ? `Oops! You hit a snake! Go back to ${newPosition}.`
          : `Great! You climbed a ladder! Jump to ${newPosition}.`
      );
    } else if (newPosition === 100) {
      setMessage("🎉 Congratulations! You won the game! 🎉");
    } else {
      setMessage(`You rolled a ${dice}. Move to ${newPosition}.`);
    }

    setPosition(newPosition);
  };

  // **Rendering Board**
  const renderBoard = () => {
    let board = [];
    for (let i = 100; i >= 1; i--) {
      const snakeOrLadder = snakesAndLadders.find((item) => item.start === i);
      board.push(
        <div
          key={i}
          className={`square ${snakeOrLadder ? snakeOrLadder.type : ""}`}
        >
          {position === i ? <div className="player">P</div> : i}
        </div>
      );
    }
    return board;
  };

  return (
    <div className="game-container">
      <h3>Snake and Ladder Game</h3>
      <p>Current Position: {position}</p>

      {/* Dice Roll Button (Disabled after winning) */}
      <button onClick={rollDice} disabled={position === 100}>
        {position === 100 ? "Game Over" : "Roll Dice"}
      </button>

      <p className="message">{message}</p>

      {/* Hide the board when the player reaches 100 */}
      {position < 100 && (
        <div className="board-container">
          <div className="board">{renderBoard()}</div>
        </div>
      )}
    </div>
  );
};

export default SnakeAndLadder;
