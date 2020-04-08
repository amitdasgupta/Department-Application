import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import { ProtectedRoute } from "./protected-route";
import Signup from "./components/signup";
import Signin from "./components/SignIn";
import ComponentDetails from "./components/ComponetDetails";
import { BrowserRouter, Route, Switch } from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Navbar} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <ProtectedRoute exact path="/app" component={Homepage} />
        <ProtectedRoute
          exact
          path="/app/component/:id"
          component={ComponentDetails}
        />
      </div>
    );
  }
}

export default App;
