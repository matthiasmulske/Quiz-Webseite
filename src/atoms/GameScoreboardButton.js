import React from "react";

const GameScoreboardButton = ({ onClick, label, addClass }) => {
  return (
    <button className={" btn bg-gradient w-50" + addClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default GameScoreboardButton;
