function GameCategoryDropdown( {label, options, selectedOption, onChange, name} ) {

  return (
        <div className="input-group" style={style.inputField}>

          <span className="input-group-text">
            <span class="material-icons">category</span>
          </span>

          <span className="input-group-text">
              {label}
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
  );
};

export default GameCategoryDropdown;

const style = {
  inputField: {
    marginBottom: 12,
  },

}
