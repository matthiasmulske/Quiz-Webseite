import React, { useState } from "react";
import GameStartButton from "../atoms/GameStartButton";
import { IoHourglassOutline } from "react-icons/io5";

function GameIntro() {
  // eslint-disable-next-line
  const [round, setRound] = useState("1");
  // eslint-disable-next-line
  const [category, setCategory] = useState("Seekabelkunde");

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6 text-center">
        <h1 className="h1">Runde {round}</h1>
        <h2 className="h2">{category}</h2>
        <div className="mb-2">
          <GameStartButton
            label="Starte Runde"
            //onClick={}
          />
        </div>
        <p>oder</p>
        <div className="">
          <div className="fs-1 text">
            <IoHourglassOutline />
          </div>
          <h3 className="text-warning"> Dein Mitspieler ist am Zug! </h3>
        </div>
        <p>
          Du gewinnst, falls ihr Mitspieler seine Runde nicht innerhalb von 3d
          12h 15min abschließt!
        </p>
      </div>
    </div>
  );
}

export default GameIntro;
