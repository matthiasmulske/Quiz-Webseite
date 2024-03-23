import * as React from "react";
import QuestionTable from "../../atoms/QuestionTable"

function EditQuestion({ userID }) {
    console.log("userid:" + userID);
    return (
        <>
            <div style={style.container}>
                <QuestionTable
                    userId={userID} // Corrected prop name from 'userId' to 'userID'
                />
            </div>
        </>
    );
}

export default EditQuestion;

const style = {
    componentContainer: {
        width: "100%",
        margin: 4,
    },
};
