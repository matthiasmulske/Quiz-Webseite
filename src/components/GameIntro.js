import React from "react";
import ContainerYourTurn from "../atoms/GameContainerYourTurn";
import NotYourTurn from "../atoms/GameNotYourTurn";

function GameIntro({ currentRound, currentCategory, turn, startRound }) {
 
  return (
    <div style={style.introContainer}>
      {currentRound === 333 ? (
        <h1 style={style.headerRound}>Letzte Runde</h1>
      ) : (
        <h1 style={style.headerRound}>Runde {currentRound}</h1>
      )}
      <h2 style={style.headerCategory}>{currentCategory}</h2>
      {turn === true ? (
        <ContainerYourTurn startRound={startRound} />
      ) : (
        <NotYourTurn/>
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
