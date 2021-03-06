const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    purchased: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Component",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// telling mongoose that it is a model
const User = mongoose.model("User", userSchema);

module.exports = User;
