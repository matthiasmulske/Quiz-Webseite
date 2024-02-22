import * as React from 'react';
import Button from '@mui/material/Button';

function GameButton ({ onClick, label, color, size }) {
  const onButtonClick = () => {
    alert("Congratulations! You successfully hit an unarmed button -.-");
  };

  return (
      <Button variant="contained" onClick={onClick ? onClick : onButtonClick} color={color} size={size}>
        {label}
      </Button>
  );
};

export default GameButton;

