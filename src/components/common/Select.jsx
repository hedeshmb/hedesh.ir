import React from "react";

const Select = ({
  name,
  label,
  options,
  valueProperty,
  nameProperty,
  error,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" {...rest} name={name} id={name}>
        <option value="" />
        {options.map((option) => (
          <option key={option[valueProperty]} value={option[valueProperty]}>
            {option[nameProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Select.defaultProps = {
  valueProperty: "_id",
  nameProperty: "name",
};

export default Select;
