import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";

class Form extends Component {
  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    console.log("Joi validation error object:", error);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    console.log("Processed validation errors:", errors);
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <button type="submit" className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  };

  renderInput = (name, label) => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}

export default Form;
