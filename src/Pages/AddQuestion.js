import * as React from "react";
import ButtonAddQuestion from "../Atoms/ButtonAddQuestion";
import InputAddQuestion from "../Atoms/InputAddQuestion";
import SetCategory from "../Atoms/SetCategory";

function AddQuestion() {
    return (
        <>
            <div>
                <InputAddQuestion/>
                <SetCategory/>
                <ButtonAddQuestion buttonLabel="Frage vorschlagen"></ButtonAddQuestion>
            </div >
        </>
    )
}

export default AddQuestion;


const style = {
    componentContainer: {
        paddingLeft: 4,
    },


}
