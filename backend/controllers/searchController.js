const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const searchContent = async (req, res) => {
  try {
    const { query, type, genre, year, rating, sortBy } = req.query;
    let endpoint = "";
    let params = {
      api_key: TMDB_API_KEY,
      language: "en-US",
      page: 1,
      include_adult: false,
    };

    // Handle different search types
    if (query) {
      endpoint = "/search/multi";
      params.query = query;
    } else {
      endpoint = type === "tv" ? "/discover/tv" : "/discover/movie";
    }

    // Add filters
    if (genre) params.with_genres = genre;
    if (year) params.primary_release_year = year;
    if (rating) params.vote_average_gte = rating;
    if (sortBy) params.sort_by = sortBy;

    const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, { params });

    // Process results to add media_type if not present
    const results = response.data.results.map((item) => ({
      ...item,
      media_type:
        item.media_type || type || (item.first_air_date ? "tv" : "movie"),
    }));

    res.json({
      ...response.data,
      results,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      message: "Error searching content",
      error: error.message,
    });
  }
};

module.exports = {
  searchContent,
};
