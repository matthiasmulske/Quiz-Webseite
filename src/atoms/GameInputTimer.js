import React from "react";

const GameTimer = ({ value, onChange }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="text-center col-md-6">

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <span class="material-icons">
              more_time
            </span>
          </span>
          <span className="input-group-text" id="basic-addon1">
            <label htmlFor="timeInput" className="form-label">
              Zeitlimit
            </label>
          </span>
          <input
            id="timeInput"
            type="number"
            className="form-control text-center"
            value={value}
            onChange={onChange}
            min="10"
            max="120"
            step="1"
          />
          <span className="input-group-text" id="basic-addon1">
            sec
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameTimer;
