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
        padding: '0.8rem',
        paddingBottom: '30px', 
        color: 'success.main',
        
        

    },
}

export default QuizTextField;
