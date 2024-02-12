import React, { useState, useEffect } from "react";
import GameQuestionAnswerButton from "../atoms/GameQuestionAnswerButton";
import GameQuestionView from "../components/GameQuestionView";

function GameQuestion() {
  // eslint-disable-next-line
  const [timer, setTimer] = useState(30);
  const [timeLeft, setTimeLeft] = useState(timer);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(intervalId);
          return 0;
        } else {
          return prevTimeLeft - 1;
        }
      });
    }, 1000);

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
          <GameQuestionAnswerButton
            //onclick=""
            label="Nächste Frage"
            addClass="btn-primary"
          />
        </div>
      </div>
    </div>
  );
}

export default GameQuestion;
