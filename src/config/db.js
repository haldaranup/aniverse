import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDb = async () => {
  try {
    await mongoose.connect(config.uri);
    console.log("Mongodb db connection established");
  } catch (error) {
    console.log("Mongodb db connection error", error);
  }
};
