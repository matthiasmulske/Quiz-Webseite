import * as React from "react";
import QuizTextField from "../atoms/QuizTextField";
import ButtonQuiz from "../atoms/ButtonQuiz";
import SelectCategory from "../atoms/SelectCategory";


function FormAddQuestion( { onClick, onDropDownChange, onTextChange, defaultValues, selectedCategory }) {
  return (
  <div style={style.container}>
      <QuizTextField defaultValue={defaultValues.QuestionText} name={"QuestionText"} label={"Frage"} onChange={onTextChange} rows={5} />
      <div style={style.gridContainer}>
        <QuizTextField defaultValue={defaultValues.Answer1} name={"Answer1"} label={"Antwort A"} onChange={onTextChange} rows={3} />
        <QuizTextField defaultValue={defaultValues.Answer2} name={"Answer2"} label={"Antwort B"} onChange={onTextChange} rows={3} />
        <QuizTextField defaultValue={defaultValues.Answer3} name={"Answer3"} label={"Antwort C"} onChange={onTextChange} rows={3} />
        <QuizTextField defaultValue={defaultValues.CorrectAnswer} name={"CorrectAnswer"} label={"Korrekte Antwort"} onChange={onTextChange} rows={3} />
      </div>
    <SelectCategory
        onDropDownChange={onDropDownChange}
        selectedCategory={selectedCategory}
    />
      <ButtonQuiz onButtonClick={onClick} buttonLabel={"Speichern"}/>
  </div>
  );
}

export default FormAddQuestion;

const style = {
    container: {
        margin: "10%"
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