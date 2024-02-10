import React from "react";

const GameCategoryDropdown = ({
  label,
  options,
  selectedOption,
  onChange,
  name,
}) => {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6">
        <div className="mb-2">
          <label htmlFor="categoryDropdown" className="form-label">
            {label}
          </label>
          <div className="input-group">
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
    </div>
  );
};

export default GameCategoryDropdown;
