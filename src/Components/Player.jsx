import React, { useState } from "react";

const Player = ({
  initialPlayerName,
  playerSymbol,
  isActive,
  handleNameChange,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [playerName, setPlayerName] = useState(initialPlayerName);

  function handleClick() {
    setIsEditable((prevState) => !prevState);
    if (isEditable) {
      handleNameChange(playerSymbol, playerName);
    }
  }
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let btnCaption = "Edit";
  let content = <span className="player-name">{playerName}</span>;

  if (isEditable) {
    btnCaption = "Save";
    content = <input type="text" onChange={handleChange} value={playerName} />;
  }
  return (
    <li className={`${isActive ? "active" : undefined} player`}>
      {content}
      <span className="player-symbol">{playerSymbol}</span>
      <button onClick={handleClick}>{btnCaption}</button>
    </li>
  );
};

export default Player;
