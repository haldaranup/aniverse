import express from "express";
import {
  addAnime,
  deleteAnimeById,
  getAllAnime,
  getAnimeById,
  updateAnimeById,
} from "../controllers/anime.controller.js";

const router = express.Router();

router.post("/", addAnime);
router.get("/", getAllAnime);
router.get("/:id", getAnimeById);
router.put("/:id", updateAnimeById);
router.delete("/:id", deleteAnimeById);

export default router;
