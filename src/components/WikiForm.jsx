import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import auth from "../services/AuthService";
import { storeWiki } from "../services/WikiService";

class WikiForm extends Form {
  state = {
    data: { title: "", link: "" },
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    link: Joi.string().required().label("Link"),
  };

  async doSumbit() {
    try {
      const response = await storeWiki(this.state.data);
      console.log(response);
      //window.location = "/";
    } catch (ex) {
      auth.logout();
      window.location = "/login";
    }
  }

  render() {
    return (
      <div>
        <h1>Wiki form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("link", "Link")}
          {this.renderButton("Submit", "btn btn-primary")}
        </form>
      </div>
    );
  }
}

export default WikiForm;
