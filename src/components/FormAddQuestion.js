import * as React from "react";
import { FormControl, InputLabel } from "@mui/material";
import QuizTextField from "../atoms/QuizTextField";
import DropDown from "../atoms/DropDown";
import ButtonQuiz from "../atoms/ButtonQuiz";
import {useState} from "react";

function FormAddQuestion({ buttonLabel, data }) {
  const [data, setData] = useState({
      question: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
  });

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit() {
    console.log(data)
  }

  function validateInput(){
  }

  return (
    <div style={style.container}>
      <QuizTextField name={'question'} value={data.question} label={"Frage"} onChange={handleChange} rows={5} />
      <div style={style.gridContainer}>
        <QuizTextField name={"answerA"} label={"Antwort A"} onChange={handleChange} rows={3} />
        <QuizTextField name={"answerB"} label={"Antwort B"} onChange={handleChange} rows={3} />
        <QuizTextField name={"answerC"} label={"Antwort C"} onChange={handleChange} rows={3} />
        <QuizTextField name={"answerD"} label={"Antwort D"} onChange={handleChange} rows={3} />
      </div>
      <FormControl style={style.gridContainer}>
        <div>
          <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
          <DropDown />
        </div>
        <QuizTextField label={"neue Kategorie eingeben"} />
      </FormControl>
      <ButtonQuiz onButtonClick={handleSubmit} buttonLabel={buttonLabel}/>
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
