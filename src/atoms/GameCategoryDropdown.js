import React from "react";

const GameCategoryDropdown = ({
  label,
  options,
  selectedOption,
  onChange,
  name,
}) => {
  return (
    <div className="container d-flex justify-content-center align-items-center mb-3">
      <div className="col-md-6">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <span class="material-icons">
              category
            </span>
          </span>
          <span className="input-group-text" id="basic-addon1">
            <label htmlFor="timeInput" className="form-label">
            {label}
            </label>
          </span>
          <select
            id="categoryDropdown"
            className="form-select text-center"
            value={selectedOption}
            onChange={onChange}
            name={name}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default GameCategoryDropdown;
