import React, { useState } from "react";
import GameMiniButton from "../atoms/GameIconButton";

function GameLinkContainer ({ player, linkText, id }) {
  const [copied, setCopied] = useState(false); // State to track if link is copied in order to change icon

  // Copy Link to clipboard
  function handleCopyLink() {
    const linkText = document.querySelector("#" + id).innerText;
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
      <div style={style.linkContainer}>
          <text style={style.text}>Link für {player}:</text>
          <a className="link-primary link-underline-opacity-0 border bg-info bg-opacity-10 border-info p-2 rounded" href={linkText} id={id}>
              {linkText}
          </a>

          <GameMiniButton
              label={copied
                  ? (<span className="material-icons">done</span>)
                  : (<span className="material-icons">content_copy</span>)}
              onClick={handleCopyLink}/>
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



