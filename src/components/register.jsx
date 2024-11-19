import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", email: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    email: Joi.string().required().email().label("Email"),
    name: Joi.string().required().label("Name") 
  };

  doSubmit = () => {
    console.log("Registration Submitted:", this.state.data);
  };

  render() {
    return (
      <div>
        <h1>Register Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")} {/* Added input for "name" */}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
