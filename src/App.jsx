import { useState } from "react";
import GameBoard from "./Components/GameBoard";
import Player from "./Components/Player";
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATION";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedPlayer(turn) {
  let currActivePlayer = "X";
  if (turn.length > 0 && turn[0].player === "X") {
    currActivePlayer = "O";
  }
  return currActivePlayer;
}
function derivedWinner(gameBoard, player){
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }
  return winner;
}

function derivedGameBoard(gameTurn){
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];

  for (const turn of gameTurn) {
    let { square, player } = turn;
    let { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [player, setPlayer] = useState({
    X: "Player 1",
    O: "player 2",
  });

  const activePlayer = derivedPlayer(gameTurn);
  const gameBoard = derivedGameBoard(gameTurn);
  const winner = derivedWinner(gameBoard, player);
  let hasDraw = gameTurn.length === 9 && !winner;
 

  function handleRestart() {
    setGameTurn([]);
  }

  function playerHandler(row, col) {
    setGameTurn((prevTurn) => {
      const currActivePlayer = derivedPlayer(prevTurn);

      const updatedTurn = [
        { square: { row: row, col: col }, player: currActivePlayer },
        ...prevTurn,
      ];
      return updatedTurn;
    });
  }

  function handleNameChange(symbol, newplayer){
    setPlayer((prevName) => {
      return {
        ...prevName,
        [symbol]: newplayer,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialPlayerName="Player 1"
            playerSymbol="X"
            isActive={activePlayer === "X"}
            handleNameChange={handleNameChange}
          />
          <Player
            initialPlayerName="Player 2"
            playerSymbol="O"
            isActive={activePlayer === "O"}
            handleNameChange={handleNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} handleRestart={handleRestart} />
        )}
        <GameBoard playerHandler={playerHandler} Board={gameBoard} />
      </div>
      <Log gameTurn={gameTurn} />
    </main>
  );
}

export default App;
