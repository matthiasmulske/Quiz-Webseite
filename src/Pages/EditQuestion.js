import * as React from "react";
import ButtonAddQuestion from "../Atoms/ButtonAddQuestion";
import InputAddQuestion from "../Atoms/InputAddQuestion";
import SelectCategory from "../Atoms/SelectCategory";
import QuestionTable from  "../Atoms/QuestionTable"

function AddQuestion() {
    return (
        <>
            <div>
                <QuestionTable/>
            </div>
            <div style={style.container}>
                <InputAddQuestion/>
                <SelectCategory/>
            </div >
            <div style={style.button}>
                <ButtonAddQuestion/>
            </div>
        </>
    )
}

export default AddQuestion;

const style = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }

};
