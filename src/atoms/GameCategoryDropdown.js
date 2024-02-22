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
        disablePortal
        size="large"
        id={name}
        options={options}
        onChange={onChange}
        value={selectedOption}
        fullWidth
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" margin="normal" fullWidth/>}
      />
  );
}

export default GameCategoryDropdown;

