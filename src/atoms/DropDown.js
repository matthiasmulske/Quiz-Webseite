import * as React from "react";
import {MenuItem, Select} from "@mui/material";


function DropDown() {
    function handleChange(){
    }

    return (
        <Select labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
                label="Kategorien"
                onChange={handleChange}>
            <MenuItem value={10}>Test2</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </Select>
    )

}

export default DropDown;
