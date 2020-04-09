import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button,
} from "reactstrap";
import React from "react";
import axios from "../api/axios";
import auth from "../auth";
import "./common-style.css";
class NavbarCustom extends React.Component {
  state = {
    isOpen: false,
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  authenticate = (str) => () => {
    this.props.history.push(str);
  };

  logout = () => {
    auth.logout();
    this.props.history.push("/");
  };

  generateComponents = () => {
    axios.get("/api/user/generatedata");
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/app">Department Application</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {auth.isAuthenticated() ? (
                  <>
                    <Button onClick={this.logout} className="links-style">
                      Logout
                    </Button>
                    {/* I made this button to randomly generate items */}
                    <Button
                      onClick={this.generateComponents}
                      style={{ marginLeft: "1%", marginRight: "1%" }}
                      className="links-style"
                      style={{ display: "none" }}
                    >
                      Lets generate components
                    </Button>
                    <div
                      style={{
                        color: "white",
                        fontSize: "1.1rem",
                        width: "1%",
                      }}
                    >
                      {localStorage.getItem("name")}
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={this.authenticate("/signin")}
                      className="links-style"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={this.authenticate("/signup")}
                      className="links-style"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavbarCustom;
