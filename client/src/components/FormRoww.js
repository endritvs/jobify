const FormRoww = ({ type, name, value, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input type={type} className="form-input" value={value} name={name} />
    </div>
  );
};

export default FormRoww;
