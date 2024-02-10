import React from "react";

const GameScoreboardButton = ({ onClick, label, addClass }) => {
  return (
    <button className={" btn bg-gradient m-2 p-3 " + addClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default GameScoreboardButton;
