import * as React from "react";
<<<<<<< HEAD:src/Pages/Question/EditQuestion.js
import FormAddQuestion from "../../components/FormAddQuestion";
import QuestionTable from  "../../atoms/QuestionTable"
=======
import FormAddQuestion from "../components/FormAddQuestion";
import QuestionTable from "../atoms/QuestionTable";
>>>>>>> gameBackend:src/pages/EditQuestion.js

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
