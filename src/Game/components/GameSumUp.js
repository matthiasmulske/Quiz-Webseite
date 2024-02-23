import React from "react";
import GameButton from "../atoms/GameButton";

function GameSumUp() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center bg-light">
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <h1>Glückwunsch!</h1>
        <h2>Du hast das Quiz gewonnen!</h2>
        <span className="material-icons fs-1 text-warning mb-3">emoji_events</span>
      </div>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <h1>Schade!</h1>
        <h2>Beim nächsten Versuch gewinnst bestimmt du!</h2>
        <span className="material-icons fs-1 text-danger mb-3">local_library</span>
      </div>
      <GameButton label="Neues Quiz" addClass={"btn-primary"}></GameButton>
    </div>
  );
}

export default GameSumUp;
