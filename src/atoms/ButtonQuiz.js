import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
  maxWidth: "200px", // Set a maximum width for the button
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

function ButtonQuiz({ buttonLabel, onButtonClick }) {
  return (
    <div>
      <StyledButton variant="contained" onClick={onButtonClick}>
        {buttonLabel}
      </StyledButton>
    </div>
  );
}

export default ButtonQuiz;
