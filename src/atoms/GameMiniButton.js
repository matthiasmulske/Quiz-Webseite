import React from "react";

const GameMiniButton = ({ onClick, label, size }) => {
  return (
    <button
      className={"btn bg-gradient text m-2 p-1 text-center " + size}
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
};

export default GameMiniButton;
