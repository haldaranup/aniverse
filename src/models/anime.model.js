import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: { type: [String], required: true },
  episodes: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Completed", "Airing", "Upcoming"],
  },
  releaseDate: { type: Date },
  rating: { type: Number, min: 0, max: 10 },
  mainCharacters: [{ name: String, role: String }],
  studios: [String],
  posterUrl: String,
  trailerUrl: String,
});

const Anime = mongoose.model("Anime", animeSchema);

export { Anime };
