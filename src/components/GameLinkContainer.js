import React, { useState } from "react";
import GameMiniButton from "../atoms/GameMiniButton";

const GameLinkContainer = ({ player, label, linkText, id }) => {
  const [copied, setCopied] = useState(false); // State to track if link is copied

  const handleCopyLink = () => {
    const linkText = document.querySelector("#" + id).innerText;
    navigator.clipboard
      .writeText(linkText)
      .then(() => {
        setCopied(true); // Set copied to true after successful copy
        setTimeout(() => {
          setCopied(false); // Reset copied state after a short delay
        }, 1000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  return (
    <div className="m-3">
      <label className="m-2">Link für {player}:</label>
      <a className="link-primary link-underline-opacity-0 border bg-info bg-opacity-10 border-info p-2 rounded" href={linkText} id={id}>
        {linkText} 
      </a>

      <GameMiniButton 
        label={copied ? <span className="material-icons">
        done
        </span> : <span className="material-icons">
        content_copy
        </span>} 
        onClick={handleCopyLink} 
        color={copied ? "text-success"  : "" }
        size="fs-5"
      />

    </div>
  );
};

export default GameLinkContainer;
