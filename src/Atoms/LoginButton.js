import React from "react";

function LoginButton({ buttonLabel, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-primary"
      style={buttonStyles}
    >
      {buttonLabel}
    </button>
  );
}
const buttonStyles = {
  fontSize: "24px",
  padding: "15px 30px", // Erhöhte Innenpolsterung für größeren Button
  borderRadius: "8px",
  width: "300px", // Breite des Buttons erhöht
  height: "80px", // Höhe des Buttons erhöht
  margin: "auto", // Zentrieren des Buttons
  display: "block", // Block-Element für margin: auto
};

export default LoginButton;
