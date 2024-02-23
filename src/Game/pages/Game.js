import React from "react";
import GameIntro from "../components/GameIntro";
import GameQuestion from "../components/GameQuestion";
import GameScoreboard from "../components/GameScoreboard";
import GameSumUp from "../components/GameSumUp";



//TODO: single or multiplayer as prop
//TODO: what is the purpose of "turn"?; rename

function Game() {
  return (
      <>
        <GameIntro
          currentRound="2"
          currentCategory="Seekabelkunde"
          turn={true}/>
        <GameQuestion/>
        <GameScoreboard/>
        <GameSumUp/>
      </>
  );
}

export default Game;
