import { Autocomplete, TextField } from "@mui/material";
function GameCategoryDropdown({
  label,
  options,
  selectedOption,
  onChange,
  name,
}) {
  return (
      <Autocomplete
        variant="standard"
        disablePortal
        size="small"
        margin="normal"
        id={name}
        options={options}
        sx={{ width: 300 }}
        onChange={onChange}
        value={selectedOption}
        renderInput={(params) => <TextField {...params} label={label} variant="standard"/>}
      />
  );
}

export default GameCategoryDropdown;

