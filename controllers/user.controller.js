import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields must be provided",
    });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).json({
        message: "User already exists",
      });
    }

    const createUser = await User.create({ name, email, password });

    return res.json({
      message: "Success",
      user: createUser,
    });
  } catch (error) {
    console.log("Error creating user", error);
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields must be provided",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        message: "Email or password incorrect",
      });
    }

    const token = user.generateToken();

    return res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {}
};

export { registerUser, loginUser };
