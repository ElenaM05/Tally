import React, { useState, useEffect } from 'react';
import './CoinCatcher.css';

const CoinCatcher = () => {
  const [playerPosition, setPlayerPosition] = useState(50);
  const [coinPosition, setCoinPosition] = useState({ left: Math.random() * 90, top: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Handle player movement
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      setPlayerPosition((prev) => Math.max(prev - 10, 0));
    } else if (event.key === 'ArrowRight') {
      setPlayerPosition((prev) => Math.min(prev + 10, 90));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Coin movement
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setCoinPosition((prev) => {
        const newTop = prev.top + 5;
        if (newTop > 90) {
          // Check collision
          if (Math.abs(prev.left - playerPosition) < 10) {
            setScore((prev) => prev + 1);
          } else {
            setGameOver(true);
          }
          return { left: Math.random() * 90, top: 0 };
        }
        return { ...prev, top: newTop };
      });
    }, 65);

    return () => clearInterval(interval);
  }, [playerPosition, gameOver]);

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setCoinPosition({ left: Math.random() * 90, top: 0 });
  };

  return (
    <div className="gameContainer">
      <h2>Coin Catcher Game</h2>
      <div className="gameArea">
        <div className="player" style={{ left: `${playerPosition}%` }}></div>
        <div
          className="coin"
          style={{ left: `${coinPosition.left}%`, top: `${coinPosition.top}%` }}
        ></div>
      </div>
      <h3>Score: {score}</h3>
      {gameOver && (
        <div className="gameOver">
          <h2>Game Over</h2>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default CoinCatcher;