import * as React from "react";
import QuestionTable from "../../atoms/QuestionTable"

function AddQuestion() {
    return (
        <>
            <div style={style.container}>
                <QuestionTable/>
            </div>
        </>
    )
}

export default AddQuestion;

const style = {
    componentContainer: {
        width: "100%",
        margin: 4,
    },
};
