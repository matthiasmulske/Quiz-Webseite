import * as React from "react";
import ButtonAddQuestion from "../Atoms/ButtonAddQuestion";
import FormAddQuestion from "../Atoms/InputAddQuestion";
import SetCategory from "../Atoms/SetCategory";

function AddQuestion() {
    return (
        <>
            <div style={style.componentContainer}>
                <FormAddQuestion/>
                <ButtonAddQuestion buttonLabel="Frage vorschlagen"></ButtonAddQuestion>
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
