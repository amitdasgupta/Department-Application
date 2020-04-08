import React from "react";
import { Card, Button } from "antd";
import "./common-style.css";
import axios from "../api/axios";
import Item from "./Item";
class ComponentDetails extends React.Component {
  state = {
    related: [],
    name: "",
    quantity: 0,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const id = this.props.match.params.id;
      const dataW = await axios.get(`/api/user/componentpage/${id}`);
      const { data: { data } = {} } = dataW;
      console.log("data we got here", data);
      this.setState({
        name: data.name,
        related: data.related,
        quantity: data.quantity,
      });
    } catch (error) {
      console.log(error);
    }
  };

  buyIt = async (e) => {
    try {
      e.stopPropagation();
      await axios.get(`/api/user/purchase/${this.props.match.params.id}`);
      let quantity = this.state.quantity - 1;
      if (quantity >= 0)
        this.setState({
          quantity: quantity,
        });
    } catch (err) {
      console.log(err);
    }
  };

  updateComponentPurchased = (index) => {
    const { related } = this.state;
    const quantity = related[index].quantity - 1;
    if (quantity >= 0) {
      related[index] = { ...related[index], quantity };
      this.setState(related);
    }
  };

  render() {
    console.log(this.state);
    const { updateComponentPurchased } = this;
    const { name, quantity, related } = this.state;
    return (
      <div>
        <div>
          <Card
            title={`${name}`}
            bordered={false}
            style={{
              backgroundColor: "grey",
              fontWeight: "bolder",
              color: "white",
              width: "92%",
              margin: "auto",
            }}
          >
            {quantity > 0 ? (
              <p>Present in stock:{`${quantity}`}</p>
            ) : (
              <p>Not Available Currently</p>
            )}
            <Button style={{ marginLeft: "46%" }} onClick={this.buyIt}>
              Buy
            </Button>
          </Card>
        </div>
        <h1 style={{ textAlign: "center", marginTop: "5%" }}>
          Other recomended items
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {related.map((item, index) => (
            <Item
              data={item}
              key={index}
              index={index}
              history={this.props.history}
              updateComponentPurchased={updateComponentPurchased}
              doRefresh={true}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ComponentDetails;
