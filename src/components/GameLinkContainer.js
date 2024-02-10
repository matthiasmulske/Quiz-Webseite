import React from "react";
import GameMiniButton from "../atoms/GameMiniButton";
import { FaRegCopy } from "react-icons/fa";

const GameLinkContainer = ({ player, label, linkText, id }) => {
  const handleCopyLink = () => {
    const linkText = document.querySelector("#" + id).innerText;
    navigator.clipboard
      .writeText(linkText)
      .then(() => {
        alert("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  return (
    <div className="m-2">
      <label className="m-2">Link für {player}:</label>
      {/* eslint-disable-next-line */}
      <a className="link-primary link-underline-opacity-0 border bg-info bg-opacity-10 border-info p-2 rounded" id={id}>
        {linkText}
      </a>
      <GameMiniButton label={<FaRegCopy />} onClick={handleCopyLink} />
    </div>
  );
};

export default GameLinkContainer;
