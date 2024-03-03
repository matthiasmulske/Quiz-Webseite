import { TextField, InputAdornment } from "@mui/material";

function GameInput({value, onChange, label, type, min, max, step, helperText, required, icon }) {
  const isNumeric = type === "number";

  return (
    <TextField
      variant="outlined"
      required={required}
      label={label}
      type={isNumeric ? "number" : type}
      inputProps={isNumeric ? { min, max, step, style: { textAlign: 'center' } } : { style: { textAlign: 'center' } }}
      value={value}
      onChange={onChange}
      size="large"
      margin="normal"
      fullWidth
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

