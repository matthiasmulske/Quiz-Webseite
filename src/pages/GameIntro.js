import React, { useState } from "react";
import GameButtonStart from "../atoms/GameButtonStart";
import { ClockLoader } from "react-spinners";

function GameIntro() {
  // eslint-disable-next-line
  const [round, setRound] = useState("1");
  // eslint-disable-next-line
  const [category, setCategory] = useState("Seekabelkunde");
  // eslint-disable-next-line
  const [timeLeft, setTimeLeft] = useState("3d 12h 54min");
  // eslint-disable-next-line
  const [yourTurn, setYourTurn] = useState();

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6 text-center">
        <h1 className="h1">Runde {round}</h1>
        <h2 className="h2">{category}</h2>
        {yourTurn ?
          <div className="mb-2">
            <GameButtonStart
              label="Starte Runde"
            />
          </div>
          : null
        }
        {!yourTurn ?
          <div className="position-relative m-4">
            <div className="d-flex justify-content-center align-items-center ">
              <ClockLoader
                size={75} // Adjust the size if needed
                color="#ffc107"
                loading={true}
                speedMultiplier={0.05} // Adjust the speed multiplier to slow down
              />
            </div>
            <h2 className="text-warning"> Dein Mitspieler ist am Zug! </h2>
            <p>
              Du gewinnst, falls dein Mitspieler seine Runde nicht innerhalb von {timeLeft} abschließt!
            </p>
          </div>
          : null
        }
      </div>
    </div>
  );
}

export default GameIntro;
