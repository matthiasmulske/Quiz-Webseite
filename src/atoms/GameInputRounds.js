import React from "react";

const GameInputRounds = ({ value, onChange }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="text-center col-md-6">
        <label htmlFor="timeInput" className="form-label">
          Runden
        </label>
        <div className="input-group mb-3">
          <input
            id="roundInput"
            type="number"
            className="form-control text-center"
            value={value}
            onChange={onChange}
            min="1"
            max="10"
            step="1"
          />
        </div>
      </div>
    </div>
  );
};

export default GameInputRounds;
