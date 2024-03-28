import React from "react";
import Link from "@mui/material/Link";

const GameLinkContainer = ({ player, linkText, id }) => {

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
