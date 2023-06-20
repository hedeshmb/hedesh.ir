import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/Form";
import auth from "../services/AuthService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSumbit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      if (auth.getCurrentUser())
        window.location = state ? state.from.pathname : "/add";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton(
                "Login",
                "w-100 cursor btn btn-lg btn-primary"
              )}
            </form>
          </div>
          <div className="col-3"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
