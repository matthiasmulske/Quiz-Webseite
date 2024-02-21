import React from "react";

function LoginButton({ buttonLabel, onClick }) {
  return (
    <button type="button" onClick={onClick} className="btn btn-primary btn-lg">
      {buttonLabel}
    </button>
  );
}

export default LoginButton;
