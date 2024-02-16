import * as React from "react";
import ButtonQuiz from "../atoms/ButtonQuiz";
import FormAddQuestion from "../components/FormAddQuestion";
import QuestionTable from  "../atoms/QuestionTable"

function AddQuestion() {
    return (
        <>
            <div>
                <QuestionTable/>
            </div>
            <div style={style.container}>
                <FormAddQuestion/>
            </div >
            <div style={style.button}>
                <ButtonQuiz/>
            </div>
        </>
    )
}

export default AddQuestion;

const style = {
    container: {
        display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'center'
    },

    button: {
        display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center'
    }

};
