import * as React from "react";
import {FormControl, InputLabel } from "@mui/material";
import QuizTextField from "../atoms/QuizTextField";
import DropDown from "../atoms/DropDown";


function FormAddQuestion() {
    function handleChange() {
    }

    return (
        <div>
            <QuizTextField label={"Frage einreichen"} rows={8}/>
            <div style={style.gridContainer}>
                <QuizTextField label={"Antwort A"} rows={4}/>
                <QuizTextField label={"Antwort B"} rows={4}/>
                <QuizTextField label={"Antwort C"} rows={4}/>
                <QuizTextField label={"Antwort D"} rows={4}/>
            </div>
            <FormControl style={style.formControlContainer}>
                <InputLabel id="demo-simple-select-label" style={style.dropDown}>Kategorie</InputLabel>
                <DropDown/>
                <QuizTextField label={"Kategorie eingeben"}/>
            </FormControl>
        </div>
    )

}

export default FormAddQuestion;

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

}





