import React, { useState } from "react";
import GameButton from "../atoms/GameButton";
import { ClockLoader } from "react-spinners";

function GameIntro(data) {
  // eslint-disable-next-line
  const [round, setRound] = useState("2");
  // eslint-disable-next-line
  const [category, setCategory] = useState("Seekabelkunde");
  // eslint-disable-next-line
  const [timeLeft, setTimeLeft] = useState("3d 12h 54min"); // Stores the amount of time the opposing player has left to play
  // eslint-disable-next-line
  const [yourTurn, setYourTurn] = useState(false); //Stores if it is the players turn

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6 text-center">
        <h1 className="h1">Runde {round}</h1>
        <h2 className="h2">{category}</h2>
        {yourTurn ? (
          <div className="m-3">
            <GameButton label="Starte Runde" addClass=" btn-primary" />
          </div>
        ) : null}
        {!yourTurn ? (
          <div className="position-relative m-4">
            <div className="d-flex justify-content-center align-items-center ">
              <ClockLoader
                size={75}
                color="#ffc107"
                loading={true}
                speedMultiplier={0.05} // Speed multiplier to slow down the clock
              />
            </div>
            <h2 className="text-warning"> Dein Mitspieler ist am Zug!</h2>
            <p>
              Du gewinnst, falls dein Mitspieler seine Runde nicht innerhalb von{" "}
              {timeLeft} abschließt!
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default GameIntro;
