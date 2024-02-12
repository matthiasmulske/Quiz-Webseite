import * as React from "react";
import ButtonAddQuestion from "../Atoms/ButtonAddQuestion";
import {TextField} from "@mui/material";
import SelectCategory from "../Atoms/SelectCategory";

function AddQuestion() {
    return (
        <>
            <TextField
                id="outlined-multiline-flexible"
                label="Frage vorschlagen"
                multiline
                rows={4}
            />
            <SelectCategory/>
            <ButtonAddQuestion/>
        </>
    )

}

export default AddQuestion;
