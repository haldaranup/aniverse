import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ userId: this._id, email: this.email }, config.jwt_secret, {
    expiresIn: config.jwt_expires,
  });
  return token;
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {}
});

const User = mongoose.model("User", userSchema);

export { User };
