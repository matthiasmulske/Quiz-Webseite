import * as React from "react";
import { TextField } from "@mui/material";


function QuizTextField({ label, rows }) {
    return (
        <TextField
            sx={style.answerField}
            id="outlined-multiline-flexible"
            label={label}
            fullWidth={true}
            multiline
            rows={rows}
        />
    );
}

const style = {
    answerField: {
        padding: '0.75rem',
        paddingBottom: '35px', 
        color: 'success.main',

    },
}

export default QuizTextField;
