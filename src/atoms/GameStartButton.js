import React from "react";

const GameStartButton = ({ onClick, label }) => {
  return (
    <button className="btn bg-gradient btn-primary m-2 p-3" onClick={onClick}>
      {label}
    </button>
  );
};

export default GameStartButton;
