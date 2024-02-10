import React from "react";
import GameQuestionAnswerButton from "../atoms/GameQuestionAnswerButton";

const GameQuestionView = (
  question,
  answer1,
  answer2,
  answer3,
  correctAnswer,
) => {
  return (
    <div>
      <div className=" mb-4">
        <h3>Wann wurde das Arpanet Seekabel verlegt?</h3>
      </div>
      <div className=" mb-4">
        <div className="row">
          <div className="col-md-6 mb-4">
            <GameQuestionAnswerButton
              //onclick=""
              label="Morgen"
              addClass="btn-primary"
            />
          </div>
          <div className="col-md-6 mb-4">
            <GameQuestionAnswerButton
              //onclick=""
              label="42"
              addClass="btn-danger"
            />
          </div>
          <div className="col-md-6 mb-4">
            <GameQuestionAnswerButton
              //onclick=""
              label="Gestern"
              addClass="btn-secondary"
            />
          </div>
          <div className="col-md-6 mb-4">
            <GameQuestionAnswerButton
              //onclick=""
              label="753 v. Chr."
              addClass="btn-success"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameQuestionView;
