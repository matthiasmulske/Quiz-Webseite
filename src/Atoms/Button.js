import React from 'react';

function Button({ addClass, onClick, label }) {
  const onButtonClick = () => {
    alert();
  };

  return (
    <div>
      <button className={"btn bg-gradient p-2 " + addClass} onClick={onClick ? onClick : onButtonClick}>
        {label}
      </button>
    </div>
  );
}

export default Button;