import React from "react";
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
      const data = await axios.get("/api/user/allcomponents");
      const {
        data: { components },
      } = data;
      this.setState({ components });
    } catch (error) {
      console.log("error in fecthing data", error);
    }
  };
  updateComponentPurchased = (index) => {
    const { components } = this.state;
    const quantity = components[index].quantity - 1;
    if (quantity >= 0) {
      components[index] = { ...components[index], quantity };
      this.setState(components);
    }
  };
  render() {
    const { components } = this.state;
    const { updateComponentPurchased } = this;
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
        {components.map((item, index) => (
          <Item
            data={item}
            key={index}
            index={index}
            updateComponentPurchased={updateComponentPurchased}
            history={this.props.history}
          />
        ))}
      </div>
    );
  }
}

export default Homepage;
