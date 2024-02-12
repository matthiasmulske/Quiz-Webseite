import {TextField} from "@mui/material";
import * as React from "react";

function InputAddQuestion() {
    return (
        <TextField
            sx={{
                width: 600,
                paddingRight: 2,
                paddingBottom: 2,
                color: 'success.main',
            }}
            id="outlined-multiline-flexible"
            label="Frage vorschlagen"
            multiline
            rows={4}
        />
    )

}

export default InputAddQuestion;




