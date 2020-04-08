import React from "react";
import { Card, Button } from "antd";
import "./common-style.css";
export default function Item(props) {
  const { _id, name, quantity } = props.data;
  console.log();
  return (
    <div className="site-card-border-less-wrapper">
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
        <p>Present in stock:{`${quantity}`}</p>
        <Button style={{ marginLeft: "35%" }}>Buy</Button>
      </Card>
    </div>
  );
}
