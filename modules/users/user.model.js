const { number } = require("joi");
const { Schema, model } = require("mongoose");

const userschema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      // validate: {
      //   validator: (v) => {
      //     return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      //   },
      //   message: (props) => `${props.value} is not validate email`,
      // },
    },
    password: { type: String, required: true, select: false }, //select :false le password aaudaina database ma
    roles: {
      type: Array,
      required: true,
      default: ["user"],
    },

    image: { type: String },
    otp: { type: String },
    isEmailVerified: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

module.exports = model("User", userschema);
