const GameButton = ({ onClick, label, addClass }) => {
  return (
    <button className={"btn bg-gradient p-2 " + addClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default GameButton;
