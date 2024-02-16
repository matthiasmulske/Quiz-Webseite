import * as React from "react";
import {TextField} from "@mui/material";


function QuizTextField({label, rows}) {

    return(
        <>
            <TextField
                sx={style.answerField}
                id="outlined-multiline-flexible"
                label={label}
                fullWidth={true}
                multiline
                rows={rows}
            />
        </>
    )
}


export default QuizTextField;

const style = {
    inputQuestion: {
        display: "flex",
        padding: 0.75,
        paddingBottom: 2,
    },

    gridContainer: {
        display: "flex",
        justifyContent: "space-between"

    },
    answerField: {
        padding: 0.75,
        paddingBottom: 4,
        color: 'success.main',
    },

    formControlContainer: {
        display: "flex",
        alignContent: "space-between",
    },

    selectCategory: {
        //margin: 4,
    },

    enterCategory: {
        //margin: 4,
        color: 'success.main',
    }
}
