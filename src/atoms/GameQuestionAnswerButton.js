import React from "react";

const GameQuestionAnswerButton = ({ onClick, label, addClass }) => {
  return (
    <button
      className={"btn bg-gradient p-2 w-100 " + addClass}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default GameQuestionAnswerButton;
