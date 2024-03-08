import React, { useState } from "react";
import data from "../data/questions.json";
import TableCell from "@mui/material/TableCell";


const rows = []
function fillRows() {
    for (let i = 0; i < data.questions.length; i++) {
        rows.push({
            question: data.questions[i].question_text,
            answerA: data.questions[i].answers[0],
            answerB: data.questions[i].answers[1],
            answerC: data.questions[i].answers[2],
            answerD: data.questions[i].answers[3],
            category: ""
        })
    }
}

fillRows();


function EditQuestionContainer({ row, children }) {
    const [editing, setEditing] = useState(false);
    const [h2Text, setH2Text] = useState(
        "Start editing to see some magic happen!"
    );

    const handleH2Click = () => {
        setEditing(true);
    };

    const handleTextFieldBlur = () => {
        setEditing(false);
    };

    const handleTextFieldChange = (event) => {
        setH2Text(event.target.value);
    };

    const handleSubmit = (event) => {
        setEditing(false);
    };

    return (
        <TableCell>
        {editing ? (
            <div>
                <input
                    type="text"
                    value={children}
                    onBlur={handleTextFieldBlur}
                    onChange={handleTextFieldChange}
                />
                <button onClick={handleSubmit}>Save</button>
            </div>

        ) : (
            <p onClick={handleH2Click}>{children}</p>
        )}
        </TableCell>
    );
};

export default EditQuestionContainer;
