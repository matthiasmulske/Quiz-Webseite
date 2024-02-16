import * as React from "react";
import QuizButton from "../atoms/ButtonQuiz";
import FormAddQuestion from "../components/FormAddQuestion";

function AddQuestion() {
    return (
        <>
            <div style={style.componentContainer}>
                <FormAddQuestion/>
                <QuizButton buttonLabel="Frage vorschlagen"></QuizButton>
            </div >
        </>
    )
}

export default AddQuestion;


const style = {
    componentContainer: {
        width: "100%",
        margin: 1,
    },


}
