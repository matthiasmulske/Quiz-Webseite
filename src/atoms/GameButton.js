import React from "react";

const GameButton = ({ onClick, label }) => {
  return (
    <button className="btn bg-gradient btn-primary p-2" onClick={onClick}>
      {label}
    </button>
  );
};

export default GameButton;
