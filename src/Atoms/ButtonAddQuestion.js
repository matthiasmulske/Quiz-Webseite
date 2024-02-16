import * as React from "react";

import Button from '@mui/material/Button';

function ButtonAddQuestion({ buttonLabel }) {
    function handleClick() {
        alert("Frage wurde hinzugefügt.")
    }

    return (
        <div style={style.buttonContainer}>
            <div style={style.button}>
                <Button variant="contained">{buttonLabel}</Button>
            </div>
        </div>
    )

}

export default ButtonAddQuestion;


const style = {
    buttonContainer: {
        alignContent: "center",
        width: "100em"

    },
    button: {
        //width: "100%",
    },


};


