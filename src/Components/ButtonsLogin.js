import React from 'react';
import Button from "../Atoms/Button";

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

function LoginButton() {
  return (
    <div>
      <Button label="Einzelspieler" onClick={startSinglePlayerGame} />
      <Button label="Mehrspieler" onClick={startMultiPlayerGame} />
      <Button label="Neue Quizfrage" onClick={addNewQuestion} />
      <Button label="Quizfrage bearbeiten" onClick={editQuestion} />
    </div>
  );
}

export default LoginButton;