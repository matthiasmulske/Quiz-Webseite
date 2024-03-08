import React from "react";

const NavbarElement = ({ onClick, label, addClass, notificationCount }) => {
  const onButtonClick = () => {
    alert("Congratulations! You successfully hit an unarmed button -.-");
  };

  return (
    <div className="position-relative d-inline-block">
      <button
        className={"btn bg-gradient p-2 " + addClass}
        onClick={onClick ? onClick : onButtonClick}
      >
        {label}
      </button>
      {notificationCount > 0 && (
        <div
          className="position-absolute top-0 end-0 bg-danger rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: "20px", height: "20px" }}
        >
          <span className="text-white">{notificationCount}</span>
        </div>
      )}
    </div>
  );
};

export default NavbarElement;
