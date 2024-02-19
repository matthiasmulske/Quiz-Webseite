import * as React from 'react';
import Button from '@mui/material/Button';

function GameButton ({ onClick, label }) {
  const onButtonClick = () => {
    alert("Congratulations! You successfully hit an unarmed button -.-");
  };

  return (
      <Button variant="contained" onClick={onClick ? onClick : onButtonClick}>
        {label}
      </Button>
  );
};

export default GameButton;

