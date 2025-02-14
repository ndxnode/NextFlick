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

// Get popular TV shows
router.get("/popular", async (req, res) => {
  try {
    const response = await tmdbAxios.get("/tv/popular");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
    res.status(500).json({ error: "Failed to fetch popular TV shows" });
  }
});

// Get top rated TV shows
router.get("/top_rated", async (req, res) => {
  try {
    const response = await tmdbAxios.get("/tv/top_rated");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching top rated TV shows:", error);
    res.status(500).json({ error: "Failed to fetch top rated TV shows" });
  }
});

// Get TV show details by ID
router.get("/:id", async (req, res) => {
  try {
    const response = await tmdbAxios.get(`/tv/${req.params.id}`, {
      params: {
        append_to_response: "videos,credits",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    res.status(500).json({ error: "Failed to fetch TV show details" });
  }
});

module.exports = router;
