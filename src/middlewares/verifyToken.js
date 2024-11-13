import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("token", token);
  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    console.log("decoded");
    const decoded = jwt.verify(token, config.jwt_secret);
    req.user = decoded;
    console.log("decoded", req.user);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Invalid or expired token.",
    });
  }
};

export default verifyToken;
