import { useState } from "react";



const GameBoard = ({ playerHandler, Board }) => {
  return (
    <ol id="game-board">
      {Board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <button
                onClick={() => playerHandler(rowIndex, colIndex)}
                key={colIndex} disabled={playerSymbol !== null}
              >
                {playerSymbol}
              </button>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
