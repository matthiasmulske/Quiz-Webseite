import * as React from "react";
import { TextField } from "@mui/material";

function QuizTextField({ name, label, rows, onChange, defaultValue }) {
  return (
    <TextField
      sx={style.answerField}
      label={label}
      name={name}
      fullWidth={true}
      multiline
      rows={rows}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
}

const style = {
  answerField: {
    paddingBottom: "30px",
    color: "success.main",
  },
};

export default QuizTextField;
