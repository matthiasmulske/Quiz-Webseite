import * as React from "react";
import { TextField } from "@mui/material";

function QuizTextField({ name, label, rows, onChange, children }) {

    return (
        <TextField
            sx={style.answerField}
            id="outlined-multiline-flexible"
            label={label}
            name={name}
            fullWidth={true}
            multiline
            rows={rows}
            onChange={onChange}
            defaultValue={children}
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
