import React, { useState } from "react";
import ContainerYourTurn from "../atoms/ContainerYourTurn";
import NotYourTurn from "../atoms/NotYourTurn";

function GameIntro() {
  const [round, setRound] = useState(2);
  const [category, setCategory] = useState("Seekabelkunde");
  const [timeLeft, setTimeLeft] = useState("3d 12h 54min");
  const [yourTurn, setYourTurn] = useState(false);

  return (
    <div style={style.introContainer}>
        <h1 style={style.headerRound}>Runde {round}</h1>
        <h2 style={style.headerCategory}>{category}</h2>

      {yourTurn
          ? <ContainerYourTurn />
          : <NotYourTurn timeLeft={timeLeft} />
      }
    </div>
  );
}

export default GameIntro;

const style = {
  introContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerRound: {
    fontSize: 50,
    marginBottom: '15px',

  },
  headerCategory: {
    marginBottom: '15px',

  }
}
