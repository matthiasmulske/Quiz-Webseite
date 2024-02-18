import React from 'react';

function startSinglePlayerGame() {
  alert("Starte Einzelspieler-Spiel");
}

function startMultiPlayerGame() {
  alert("Starte Mehrspieler-Spiel");
}

function addNewQuestion() {
  alert("Füge eine neue Quizfrage hinzu");
}

function editQuestion() {
  alert("Bearbeite eine Quizfrage");
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
      <button onClick={addNewQuestion}>
        Neue Quizfrage
      </button>
      <button onClick={editQuestion}>
        Quizfrage bearbeiten
      </button>
    </div>
  );
}

export default StartComponent;