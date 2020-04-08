import React from "react";
import "./common-style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import auth from "../auth";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class Signin extends React.Component {
  state = {
    email: "",
    password: "",
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/app");
    }
  }
  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await axios.post("/api/user/login", this.state);
      console.log(data);
      const {
        data: {
          token,
          user: { name },
        },
      } = data;
      console.log("token", token);
      if (token) {
        auth.login(token, name);
        this.props.history.push("/app");
      }
    } catch (error) {
      console.log("error ocurred", error);
    }
  };

  handleChange = (e, type) => {
    const obj = {};
    obj[type] = e.target.value;
    this.setState(obj);
  };
  render() {
    return (
      <div className="App">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email here"
              onChange={(e) => {
                this.handleChange(e, "email");
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              onChange={(e) => {
                this.handleChange(e, "password");
              }}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Signin;
