import React from 'react';

function startSinglePlayerGame() {
  alert("Starte Einzelspieler-Spiel");
}

function startMultiPlayerGame() {
  alert("Starte Mehrspieler-Spiel");
}

function StartComponent() {
  return (
    <div>
      <button onClick={startSinglePlayerGame}>
        Einzelspieler
      </button>
      <button onClick={startMultiPlayerGame}>
        Mehrspieler
      </button>
    </div>
  );
}

export default StartComponent;