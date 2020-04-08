import React from "react";
import { Card, Button } from "antd";
import "./common-style.css";
import axios from "../api/axios";
export default function Item(props) {
  const { _id, name, quantity } = props.data;
  const { updateComponentPurchased, index } = props;
  console.log();
  const buyIt = async (e) => {
    try {
      e.stopPropagation();
      await axios.get(`/api/user/purchase/${_id}`);
      updateComponentPurchased(index);
    } catch (err) {
      console.log(err);
    }
  };
  const giveComponentPage = () => {
    console.log("showing component page");
    props.history.push(`/app/component/${_id}`);
    if (props.doRefresh) {
      window.location.reload();
    }
  };
  return (
    <div className="site-card-border-less-wrapper" onClick={giveComponentPage}>
      <Card
        title={`${name}`}
        bordered={false}
        style={{
          width: 300,
          backgroundColor: "grey",
          margin: "5vw",
          fontWeight: "bolder",
          color: "white",
        }}
      >
        {quantity > 0 ? (
          <p>Present in stock:{`${quantity}`}</p>
        ) : (
          <p>Not Available Currently</p>
        )}
        <Button style={{ marginLeft: "35%" }} onClick={buyIt}>
          Buy
        </Button>
      </Card>
    </div>
  );
}
