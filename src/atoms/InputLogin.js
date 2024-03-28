import React, { useState } from "react";

const InputLogin = ({ placeholder = "", type = "text" }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="form-control mb-3"
      style={{ width: "300px" }}
    />
  );
};

export default InputLogin;
