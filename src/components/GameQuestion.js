import React, { useState, useEffect } from "react";
import GameButton from "../atoms/GameButton";
import GameQuestionView from "./GameQuestionView";

const answers = ["Morgen", "42", "Gestern", "753 v. Chr."]

function GameQuestion() {
  const [timer, setTimer] = useState(30);
  const [timeLeft, setTimeLeft] = useState(timer);

  // start Timer when site loads
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
    <div style={style.pageContainer}>
        <div className="progress mb-4">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${(timeLeft / timer) * 100}%` }}
          ></div>
        </div>

        <GameQuestionView
            question="Wann wurde das Arpanet Seekabel verlegt?"
            answers={answers}
        />

        <div className="mb-2">
          <GameButton
            //onclick=""
            label="Nächste Frage"
            addClass="btn-primary w-100"
          />
        </div>
    </div>
  );
}

export default GameQuestion;

const style = {
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    position: 'relative',
  },


}
