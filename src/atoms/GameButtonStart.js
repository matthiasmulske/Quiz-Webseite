import React from "react";

const GameStartButton = ({ onClick, label }) => {
  return (
    <button className="btn bg-gradient btn-primary m-4 p-2" onClick={onClick}>
      {label}
    </button>
  );
};

export default GameStartButton;
