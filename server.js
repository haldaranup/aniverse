import express from "express";
import { config } from "./src/config/config.js";
import { connectDb } from "./src/config/db.js";
import userRoute from "./src/routes/user.route.js";
import animeRoute from "./src/routes/anime.route.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/animes", animeRoute);

app.listen(config.port, (error) => {
  connectDb();
  if (error) {
    console.log("error", error);
    return;
  }
  console.log("listening on port:" + config.port);
});
