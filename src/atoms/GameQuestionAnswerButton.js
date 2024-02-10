import React from "react";

const GameQuestionAnswerButton = ({ onClick, label, addClass }) => {
  return (
    <button className={"btn bg-gradient p-3 " + addClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default GameQuestionAnswerButton;
