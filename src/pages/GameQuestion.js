import React, { useState } from "react";
import GameQuestionAnswerButton from "../atoms/GameQuestionAnswerButton";
import GameQuestionView from "../components/GameQuestionView";

function GameQuestion() {
  // eslint-disable-next-line
  const [timer, setTimer] = useState("30s");

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col text-center position-relative">
        <h2 className="mb-4">{timer}</h2>
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
