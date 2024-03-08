import GameButton from "./GameButton";
import React from "react";

function ContainerYourTurn({ startRound }) {
  return (
    <>
      <GameButton label="Starte Runde" onClick={startRound} />
    </>
  );
}

export default ContainerYourTurn;
