import React, { useState } from "react";
import Link from '@mui/material/Link';
import GameButton from "../atoms/GameButton";

function GameLinkContainer ({ player, linkText, id }) {
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
        alert("Failed to copy link: ");
      });
  };

  return (
    <div className="m-3">
      <label className="m-2">Link für {player}:</label>
      <Link href={linkText} underline="hover">
        {linkText}
      </Link>
      <GameButton
        label={
          copied ? (
            <span className="material-icons">done</span>
          ) : (
            <span className="material-icons">content_copy</span>
          )
        }
        onClick={handleCopyLink}
        color={copied ? "success" : "primary"}
        size="small"
        variante="text"
      />
    </div>
  );
};

export default GameLinkContainer;

const style = {
    linkContainer: {
        marginTop: 30,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)', // 2 columns, each with equal width
        gridRowGap: '20px',
        gridColumnGap: '10px',
    },

    text: {
        marginTop: 9,

    }
}



