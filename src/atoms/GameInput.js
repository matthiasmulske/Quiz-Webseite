import React from "react";

const GameInput = ({
  value,
  onChange,
  label,
  type,
  min,
  max,
  step,
  icon,
  unit,
  required,
}) => {
  return (
    <div className="container d-flex justify-content-center align-items-center mb-3">
      <div className="text-center col-md-6">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <span class="material-icons">{icon}</span>
          </span>
          <span className="input-group-text" id="basic-addon1">
            <label htmlFor="timeInput" className="form-label">
              {label}
            </label>
          </span>
          <input
            type={type}
            className="form-control text-center"
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            required={required}
          />
          <span className="input-group-text" id="basic-addon1">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameInput;
