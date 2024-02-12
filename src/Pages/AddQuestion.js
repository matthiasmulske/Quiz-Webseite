import * as React from "react";
import ButtonAddQuestion from "../Atoms/ButtonAddQuestion";
import {TextField} from "@mui/material";

function AddQuestion() {
    return (
        <>
            <TextField
                id="outlined-multiline-flexible"
                label="Frage vorschlagen"
                multiline
                rows={4}
            />
            <text>DropDown</text>
            <ButtonAddQuestion/>
        </>
    )

}

export default AddQuestion;
