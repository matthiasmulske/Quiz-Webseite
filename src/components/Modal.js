import React from "react";
import GameQuestionView from "./GameQuestionView";

const Modal = ({ onClose }) => {
  return (
    <div className="">
      <div className="position-relative text-center">
        <div className="">
          <h3>Round 1 - Question 1: Seekabelkunde</h3>
        </div>
        <GameQuestionView />
        <button className="btn btn-outline-secondary me-5" onClick={onClose}>
          Back to Scoreboard
        </button>
        <button className="btn btn-outline-warning" onClick={onClose}>
          !
        </button>
      </div>
    </div>
  );
};

export default Modal;
