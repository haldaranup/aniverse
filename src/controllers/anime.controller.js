import { Anime } from "../models/anime.model.js";

const getAllAnime = async (req, res) => {
  try {
    const allAnime = await Anime.find({});
    if (allAnime.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "Anime fetched successfully",
        data: {
          count: allAnime.length,
          anime: allAnime
        },
      });
    } else {
      return res.status(200).json({
        status: "fail",
        message: "No Anime found",
        data: {},
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong",
      data: {},
    });
  }
};

const addAnime = async (req, res) => {
  const { title, description, genres, episodes, status } = req.body;
  if (!title || !description || !genres || !episodes || !status) {
    return res.status(400).json({
      status: "fail",
      message: "Required fields are missing",
      data: {},
    });
  }
  console.log({ ...req.body });
  try {
    const createAnime = await Anime.create({ ...req.body });
    return res.status(201).json({
      status: "success",
      message: "Anime created successfully",
      data: {
        anime: createAnime
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong",
      data: {},
    });
  }
};

const addMultipleAnimes = async (req, res) => {
  const animes = req.body;

  if(!Array.isArray(animes) && animes.length < 1) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide array of animes",
      data: {},
    });
  }
  
  animes.forEach(anime => {
    if (!anime.title || !anime.description || !anime.genres || !anime.episodes || !anime.status) {
      return res.status(400).json({
        status: "fail",
        message: "Required fields are missing",
        data: {},
      });
    }
  });

  const addMultiple = await Anime.insertMany(animes);

  return res.status(200).json({
    status: "success",
    message: "Animes were added successfully",
    data: {
      count: animes.length,
      animes: addMultiple
    },
  })
}

const getAnimeById = async (req, res) => {
  try {
    const id = req.params.id;
    const anime = await Anime.findById(id);
    if (!anime) {
      return res.status(204).json({
        status: "success",
        message: "Anime not found",
        data: {},
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "Anime fetched successfully",
        data: {
          anime: anime
        },
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong",
      data: {},
    });
  }
};

const updateAnimeById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const anime = await Anime.findByIdAndUpdate(id, updateData, { new: true });
    if (!anime) {
      return res.status(204).json({
        status: "fail",
        message: "Anime not found",
        data: anime,
      });
    } else {
      return res.status(201).json({
        status: "success",
        message: `Anime with id ${id} updated successfully`,
        data: {
          anime: anime
        },
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong",
      data: {},
    });
  }
};

const deleteAnimeById = async (req, res) => {
  try {
    const id = req.params.id;
    const anime = await Anime.findByIdAndDelete(id);
    if (!anime) {
      return res.status(200).json({
        status: "fail",
        message: "Anime not found",
        data: {},
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: `Anime with id ${id} deleted successfully`,
        data: {
          anime: anime
        },
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong",
      data: {},
    });
  }
};

export {
  addAnime,
  getAllAnime,
  getAnimeById,
  updateAnimeById,
  deleteAnimeById,
  addMultipleAnimes
};
