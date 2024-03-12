import * as React from "react";
import QuizTextField from "../atoms/QuizTextField";
import ButtonQuiz from "../atoms/ButtonQuiz";
import SelectCategory from "../atoms/SelectCategory";


function FormAddQuestion( { onClick, categories, selectedCategory, onDropDownChange, onTextChange }) {
  return (
  <div style={style.container}>

      <QuizTextField name={'question'} label={"Frage"} onChange={onTextChange} rows={5} />
      <div style={style.gridContainer}>
        <QuizTextField name={"answerA"} label={"Antwort A"} onChange={onTextChange} rows={3} />
        <QuizTextField name={"answerB"} label={"Antwort B"} onChange={onTextChange} rows={3} />
        <QuizTextField name={"answerC"} label={"Antwort C"} onChange={onTextChange} rows={3} />
        <QuizTextField name={"correctAnswer"} label={"Korrekte Antwort"} onChange={onTextChange} rows={3} />
      </div>
      <SelectCategory
          categories={categories}
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
