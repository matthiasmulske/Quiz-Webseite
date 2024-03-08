import * as React from "react";
import FormAddQuestion from "../../components/FormAddQuestion";
import QuestionTable from "../../atoms/QuestionTable"

function AddQuestion() {
  return (
    <>
      <div style={style.container}>
        <QuestionTable />
        <FormAddQuestion
          buttonLabel={"Senden"}
          questionLabel={"Frage bearbeiten"}
        />
      </div>
    </>
  );
}

export default AddQuestion;

const style = {
  componentContainer: {
    width: "100%",
    margin: 4,
  },
};
