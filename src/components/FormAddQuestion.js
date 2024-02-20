import * as React from "react";
import { FormControl, InputLabel } from "@mui/material";
import QuizTextField from "../atoms/QuizTextField";
import DropDown from "../atoms/DropDown";
import ButtonQuiz from "../atoms/ButtonQuiz";

function FormAddQuestion({ buttonLabel, questionLabel }) {
  function handleChange() {}

  return (
    <div style={style.container}>
      <QuizTextField label={"Frage"} rows={5} />
      <div style={style.gridContainer}>
        <QuizTextField label={"Antwort A"} rows={3} />
        <QuizTextField label={"Antwort B"} rows={3} />
        <QuizTextField label={"Antwort C"} rows={3} />
        <QuizTextField label={"Antwort D"} rows={3} />
      </div>
      <FormControl style={style.gridContainer}>
        <div>
          <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
          <DropDown />
        </div>
        <QuizTextField label={"neue Kategorie eingeben"} />
      </FormControl>
      <ButtonQuiz buttonLabel={buttonLabel} />
    </div>
  );
}

export default FormAddQuestion;

const style = {
  container: {
    margin: "10%",
  },

  gridContainer: {
    display: "grid",
    gridAutoFlow: "row",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "20px",
  },
 
  formControlContainer: {
    display: "flex",
    alignContent: "space-between",
  },
};
