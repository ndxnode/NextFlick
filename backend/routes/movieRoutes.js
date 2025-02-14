const express = require("express");
const router = express.Router();
const axios = require("axios");

// TMDB API Configuration
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const tmdbAxios = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: process.env.TMDB_API_KEY,
  },
});

// Get trending movies
router.get("/trending", async (req, res) => {
  try {
    const response = await tmdbAxios.get("/trending/movie/week");
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching trending movies:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to fetch trending movies",
      details: error.response?.data || error.message,
    });
  }
});

// Get popular movies
router.get("/popular", async (req, res) => {
  try {
    const response = await tmdbAxios.get("/movie/popular");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

// Get top rated movies
router.get("/top_rated", async (req, res) => {
  try {
    const response = await tmdbAxios.get("/movie/top_rated");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    res.status(500).json({ error: "Failed to fetch top rated movies" });
  }
});

// Get movie details by ID
router.get("/:id", async (req, res) => {
  try {
    const response = await tmdbAxios.get(`/movie/${req.params.id}`, {
      params: {
        append_to_response: "videos,credits",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

module.exports = router;
