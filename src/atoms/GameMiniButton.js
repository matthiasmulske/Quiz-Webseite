import React from "react";

const GameMiniButton = ({ onClick, label, size, color }) => {
  
  return (
    <button
      className={"btn bg-gradient text text-center " + size + " " + color}
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
};

export default GameMiniButton;
