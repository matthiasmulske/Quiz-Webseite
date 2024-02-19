function GameInput({value, onChange, label, type, min, max, step, icon, unit, required, }) {
  return (
        <div className="input-group" style={style.inputField}>
          <span className="input-group-text">
            <span class="material-icons">{icon}</span>
          </span>

          <span className="input-group-text">
              {label}
          </span>

          <input
            className="form-control text-center"
            type={type}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            required={required}
          />

          <span className="input-group-text">
            {unit}
          </span>
        </div>
  );
};

export default GameInput;

const style = {
  inputField: {
    marginBottom: 12,
  },

}
