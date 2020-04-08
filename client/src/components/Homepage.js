import React from "react";
import User from "./User";
import { Button } from "reactstrap";
import auth from "../auth";
import axios from "../api/axios";
import Item from "./Item";

class Homepage extends React.Component {
  state = {
    components: [],
  };
  componentDidMount() {
    this.getAllData();
  }
  getAllData = async () => {
    try {
      console.log("I am fecthing data");
      const data = await axios.get("/api/user/allcomponents");
      const {
        data: { components },
      } = data;
      console.log("data we got here", components);
      this.setState({ components });
    } catch (error) {
      console.log("error in fecthing data", error);
    }
  };
  render() {
    const { components } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {components.map((item) => (
          <Item data={item} key={`${item._id}`} />
        ))}
      </div>
    );
  }
}

export default Homepage;
