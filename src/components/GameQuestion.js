import React, { useState, useEffect } from "react";
import GameButton from "../atoms/GameButton";
import GameQuestionView from "./GameQuestionView";

function GameQuestion() {
  // eslint-disable-next-line
  const [timer, setTimer] = useState(30);
  const [timeLeft, setTimeLeft] = useState(timer);

  //start Timer when site loads
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(intervalId);
          return 0;
        } else {
          return prevTimeLeft - 0.05;
        }
      });
    }, 50);

    return () => clearInterval(intervalId);
  }, [timer]);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col text-center position-relative">
        <div className="progress mb-4">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${(timeLeft / timer) * 100}%` }}
          ></div>
        </div>
        <GameQuestionView
          question="Wann wurde das Arpanet Seekabel verlegt?"
          answer1="Morgen"
          answer2="42"
          answer3="Gestern"
          correctAnswer="753 v. Chr."
        />

        <div className="mb-2">
          <GameButton
            //onclick=""
            label="Nächste Frage"
            addClass="btn-primary w-100"
          />
        </div>
      </div>
    </div>
  );
}

export default GameQuestion;
