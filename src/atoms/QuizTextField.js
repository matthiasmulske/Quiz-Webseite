import * as React from "react";
import { TextField } from "@mui/material";

function QuizTextField({ label, rows }) {
  return (
    <>
      <TextField
        sx={style.answerField}
        id="outlined-multiline-flexible"
        label={label}
        fullWidth={true}
        multiline
        rows={rows}
      />
    </>
  );
}

export default QuizTextField;

//LW: hier doppelter Style Code
const style = {
  answerField: {
    padding: 0.75,
    paddingBottom: 4,
    color: "success.main",
  },
};
