import React, { useState, useEffect } from "react";
import ContainerYourTurn from "../atoms/ContainerYourTurn";
import NotYourTurn from "../atoms/NotYourTurn";

function GameIntro({ currentRound, currentCategory, turn, startRound }) {
  const [timeLeft, setTimeLeft] = useState("3d 12h 54min");
  return (
    <div style={style.introContainer}>
      <h1 style={style.headerRound}>Runde {currentRound}</h1>
      <h2 style={style.headerCategory}>{currentCategory}</h2>

      {turn === true ? (
        <ContainerYourTurn startRound={startRound} />
      ) : (
        <NotYourTurn timeLeft={timeLeft} />
      )}
    </div>
  );
}

export default GameIntro;

const style = {
  introContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  headerRound: {
    fontSize: 50,
    marginBottom: "15px",
  },
  headerCategory: {
    marginBottom: "15px",
  },
};
