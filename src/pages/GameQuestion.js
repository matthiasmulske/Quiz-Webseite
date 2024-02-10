import React from "react";
import GameQuestionAnswerButton from "../atoms/GameQuestionAnswerButton";
import GameQuestionView from "../components/GameQuestionView";

function GameQuestion() {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6 text-center position-relative">
        <h2 className="mb-5">30s</h2>
        <div className="position-absolute top-0 end-0">
          <GameQuestionAnswerButton label="!" addClass="btn-warning" />
        </div>
        <GameQuestionView></GameQuestionView>

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
