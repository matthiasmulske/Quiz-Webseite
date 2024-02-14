import React from "react";
import GameIntro from "../components/GameIntro";
import GameQuestion from "../components/GameQuestion";
import GameScoreboard from "../components/GameScoreboard";
import GameSumUp from "../components/GameSumUp";

function Game() {
  return (
    <div className="">
      <div className="mb-3">
        <GameIntro
          currentRound="2"
          currentCategory="Seekabelkunde"
          turn={true}
        />
      </div>
      <div className="mb-3">
        <GameQuestion></GameQuestion>
      </div>
      <div className="mb-3">
        <GameScoreboard></GameScoreboard>
      </div>
      <div className="mb-3">
        <GameSumUp></GameSumUp>
      </div>
      <div className="mb-3"></div>
    </div>
  );
}

export default Game;
