import express from "express";
import { config } from "./config/config.js";
import { connectDb } from "./config/db.js";
import userRoute from "./routes/user.route.js";
import animeRoute from "./routes/anime.route.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/anime", animeRoute);

app.listen(config.port, (error) => {
  connectDb();
  if (error) {
    console.log("error", error);
    return;
  }
  console.log("listening on port:" + config.port);
});
