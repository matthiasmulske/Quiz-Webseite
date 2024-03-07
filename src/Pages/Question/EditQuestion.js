import * as React from "react";
import QuestionTable from "../../atoms/QuestionTable"

function EditQuestion() {

    return (
        <>
            <div style={style.container}>
                <QuestionTable/>
            </div>
        </>
    )
}

export default EditQuestion;

const style = {
    componentContainer: {
        width: "100%",
        margin: 4,
    },
};
