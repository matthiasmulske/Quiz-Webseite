import React from 'react';
import Button from "../Atoms/Button";

function startSinglePlayerGame() {
  alert("Starte Einzelspiel");
}

function startMultiPlayerGame() {
  alert("Starte Mehrspieler Spiel");
}

function StartButton() {
  return (
    <div>
      <Button label="Einzelspieler" onClick={startSinglePlayerGame} />
      <Button label="Mehrspieler" onClick={startMultiPlayerGame} />
    </div>
  );
}

export default StartButton;