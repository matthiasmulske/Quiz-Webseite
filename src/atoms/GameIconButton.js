import Button from "@mui/material/Button";

const GameMiniButton = ({ onClick, label, size, color }) => {
  return (
    <Button
      className={"btn bg-gradient text text-center " + size + " " + color}
      onClick={onClick}
    >
      <span>{label}</span>
    </Button>
  );
};

export default GameMiniButton;
