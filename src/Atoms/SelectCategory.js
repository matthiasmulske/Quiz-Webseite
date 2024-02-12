import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React from "react";

function SelectCategory() {
    function handleChange() {
    }

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <TextField id="outlined-basic" label="Kategorie hinzufügen" variant="outlined" />
            </FormControl>
        </>
    )

}

export default SelectCategory;

