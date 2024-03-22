import React, { useState } from "react";
import Link from "@mui/material/Link";
import GameButton from "../atoms/GameButton";

const GameLinkContainer = ({ player, linkText, id }) => {
  const [copied, setCopied] = useState(false); // State to track if link is copied in order to change icon

  //Copy Link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(linkText)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  return (
    <div className="m-3">
      <label className="m-2">Link für {player}:</label>
      <Link href={linkText} underline="hover">
        {linkText}
      </Link>
    </div>
  );
};

export default GameLinkContainer;
