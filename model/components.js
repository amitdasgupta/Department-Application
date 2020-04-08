const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    related: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Component",
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// telling mongoose that it is a model
const Component = mongoose.model("Component", componentSchema);

module.exports = Component;
