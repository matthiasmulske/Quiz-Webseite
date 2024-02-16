import * as React from "react";
import Button from '@mui/material/Button';

function ButtonAddQuestion({ buttonLabel }) {
    function handleClick() {
        alert("Frage wurde hinzugefügt.")
    }

    return (
        <div style={style.button}>
            <Button variant="contained">{buttonLabel}</Button>
        </div>
    )

}

export default ButtonAddQuestion;


const style = {
    button: {
        margin: 4,
        maxWidth: 'body',
    },


};


