import * as React from "react";
import Button from '@mui/material/Button';

function ButtonAddQuestion() {
    function handleClick() {
        alert("Frage wurde hinzugefügt.")
    }

    return (
        <>
            <Button
                sx={{width: 500,}}
                variant="contained"
                onClick={handleClick}
            >
                Frage vorschlagen
            </Button>
        </>
    )

}

export default ButtonAddQuestion;


