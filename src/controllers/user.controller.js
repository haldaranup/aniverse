import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "All fields must be provided",
      data: [],
    });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).json({
        status: "fail",
        message: "User already exists",
        data: [],
      });
    }

    const createUser = await User.create({ name, email, password });

    return res.json({
      status: "Success",
      message: "User created",
      data: createUser,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong",
      data: [],
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "All fields must be provided",
      data: [],
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
        data: [],
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        status: "fail",
        message: "Email or password incorrect",
        data: [],
      });
    }

    const token = user.generateToken();

    return res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong",
      data: [],
    });
  }
};

export { registerUser, loginUser };
