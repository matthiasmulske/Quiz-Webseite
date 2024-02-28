import * as React from "react";
import { TextField } from "@mui/material";

function QuizTextField({ label, rows, onChange }) {

    return (
        <TextField
            sx={style.answerField}
            id="outlined-multiline-flexible"
            label={label}
            fullWidth={true}
            multiline
            rows={rows}
            onChange={onChange}
        />
    );
}

const style = {
    answerField: {
        paddingBottom: '30px',
        color: 'success.main',
    },
}

export default QuizTextField;
