import * as React from "react";
import FormAddQuestion from "../../components/FormAddQuestion";

function AddQuestion() {
    return (
        <>
            <div style={style.componentContainer}>
                <FormAddQuestion buttonLabel={"Frage einreichen"}/>
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
