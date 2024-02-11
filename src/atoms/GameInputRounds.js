import React from "react";

const GameInputRounds = ({ value, onChange }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center mb-3">
      <div className="text-center col-md-6">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <span class="material-icons">loop</span>
          </span>
          <span className="input-group-text" id="basic-addon1">
            <label htmlFor="timeInput" className="form-label">
              Runden
            </label>
          </span>
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
