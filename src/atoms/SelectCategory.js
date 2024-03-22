import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {Select} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";


function SelectCategory({categories, selectedCategory, onDropDownChange}) {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
                    {categories != null ? (
                        <Select
                            value={selectedCategory}
                            label="Kategorie"
                            onChange={onDropDownChange}>
                            {categories.map((category) =>
                                <MenuItem
                                    key={category.QuestionCategoryID}
                                    value={category}>
                                    {category.Name}
                                </MenuItem>)}
                        </Select>
                    ) : (console.log("Loading"))}
            </FormControl>
        </Box>
    );
}

export default SelectCategory;
