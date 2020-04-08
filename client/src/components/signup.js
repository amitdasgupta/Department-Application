import React from "react";
import "./common-style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
import auth from "../auth";
class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    department: "",
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/app");
    }
  }
  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await axios.post("/api/user/register ", this.state);
      console.log(data);
      const {
        data: { token },
      } = data;
      console.log("token", token);
      if (token) {
        auth.login(token);
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
    console.log(this.state);
    return (
      <div className="App">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter name here"
              onChange={(e) => {
                this.handleChange(e, "name");
              }}
            />
          </FormGroup>
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

export default Signup;
