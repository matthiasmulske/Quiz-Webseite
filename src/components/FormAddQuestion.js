import * as React from "react";
import { FormControl, InputLabel } from "@mui/material";
import QuizTextField from "../atoms/QuizTextField";
import DropDown from "../atoms/DropDown";
import ButtonQuiz from "../atoms/ButtonQuiz";
import {useState} from "react";

function FormAddQuestion({ buttonLabel }) {
  const [inputQuestion, setInputQuestion] = useState("")
  const [inputAnswerA, setAnswerA] = useState("")
  const [inputAnswerB, setAnswerB] = useState("")
  const [inputAnswerC, setAnswerC] = useState("")
  const [inputAnswerD, setAnswerD] = useState("")

  function handleChange(event, setterFunction) {
    setterFunction(event.target.value);
  }

  function handleSubmit() {
    const formData = {
      questions: [
        {
          question_number: 1,
          question_text: inputQuestion,
          answers: {
            1: inputAnswerA,
            2: inputAnswerB,
            3: inputAnswerC,
            4: inputAnswerD,
          },
        },
      ],
    };

  }

  function validateInput(){
  }

  return (
    <div style={style.container}>
      <QuizTextField label={"Frage"} onChange={(event) => handleChange(event, setInputQuestion)} rows={5} />
      <div style={style.gridContainer}>
        <QuizTextField label={"Antwort A"} onChange={(event) => handleChange(event, setAnswerA)} rows={3} />
        <QuizTextField label={"Antwort B"} onChange={(event) => handleChange(event, setAnswerB)} rows={3} />
        <QuizTextField label={"Antwort C"} onChange={(event) => handleChange(event, setAnswerC)} rows={3} />
        <QuizTextField label={"Antwort D"} onChange={(event) => handleChange(event, setAnswerD)} rows={3} />
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
