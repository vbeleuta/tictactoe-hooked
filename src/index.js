import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square({ value, onClick }) {
  return (
    <button onClick={onClick} className="square">
      {value}
    </button>
  );
}

function Board({ squares, onClick }) {
  const renderSquare = i => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div className="game-board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "x" : "o";
    const nextWinner = calculateWinner(nextSquares);
    setWinner(nextWinner);
    setXIsNext(!xIsNext);
    setSquares(nextSquares);
  }

  let nextStatus = "next player: " + (xIsNext ? "x" : "o");
  if (winner) {
    nextStatus = "winner: " + winner;
  }

  return (
    <div className="game">
      <div className="game-header">tic tac toe</div>
      <Board squares={squares} onClick={i => handleClick(i)} />
      <div className="game-status">{nextStatus}</div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
