import React from "react";
import { LuTimer } from "react-icons/lu";

const GameTimer = ({ value, onChange }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="text-center col-md-6">
        <label htmlFor="timeInput" className="form-label">
          Zeitlimit
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <LuTimer />
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
            s
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameTimer;
