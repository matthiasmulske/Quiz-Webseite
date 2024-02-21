import { TextField, InputAdornment } from "@mui/material";

function GameInput({value, onChange, label, type, min, max, step, helperText, required, icon }) {
  const isNumeric = type === "number";

  return (
    <TextField
      variant="standard"
      required={required}
      label={label}
      type={isNumeric ? "number" : type}
      inputProps={isNumeric ? { min, max, step } : undefined}
      value={value}
      onChange={onChange}
      size="small"
      margin="normal"
      helperText={helperText}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default GameInput;

