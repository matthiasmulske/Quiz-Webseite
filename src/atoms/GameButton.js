const GameButton = ({ onClick, label, addClass }) => {

  const onButtonClick = () => {
    alert("Congratulations! You successfully hit an unarmed button -.-");
  };

  return (
    <button className={"btn bg-gradient p-2 " + addClass} onClick={onClick ? onClick : onButtonClick}>
      {label}
    </button>
  );
};

export default GameButton;
