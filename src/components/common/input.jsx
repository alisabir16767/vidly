import React from "react";

const Input = ({ name, label, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={name === "password" ? "password" : "text"}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>} 
    </div>
  );
};

export default Input;
