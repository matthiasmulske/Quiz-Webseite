import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/Select';

function GameCategoryDropdown({
  label,
  options,
  selectedOption,
  onChange,
}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <NativeSelect
          value={selectedOption}
          onChange={onChange}
          label={label}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

export default GameCategoryDropdown;
