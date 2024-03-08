import * as React from "react";

import Button from "@mui/material/Button";

function ButtonQuiz({ buttonLabel, onButtonClick }) {
    function handleClick() {
        alert("Frage wurde hinzugefügt.")
    }
function ButtonQuiz({ buttonLabel }) {
  function handleClick() {
    alert("Frage wurde hinzugefügt.");
  }

    return (
        <div>
            <Button variant="contained" onClick={onButtonClick}>{buttonLabel}</Button>
        </div>
    )

  return (
    <div>
      <Button variant="contained">{buttonLabel}</Button>
    </div>
  );
}

export default ButtonQuiz;
