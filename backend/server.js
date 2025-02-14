require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Connect to MongoDB
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined in environment variables");
  process.exit(1);
}
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// TMDB API Configuration
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const tmdbAxios = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: process.env.TMDB_API_KEY,
  },
});

// TMDB API Routes
app.get("/api/movies/trending", async (req, res) => {
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

app.get("/api/movies/popular", async (req, res) => {
  try {
    const response = await tmdbAxios.get("/movie/popular");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

app.get("/api/movies/top_rated", async (req, res) => {
  try {
    const response = await tmdbAxios.get("/movie/top_rated");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    res.status(500).json({ error: "Failed to fetch top rated movies" });
  }
});

app.get("/api/movies/:id", async (req, res) => {
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

app.get("/api/search/movies", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await tmdbAxios.get("/search/movie", {
      params: {
        query,
        include_adult: false,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "Failed to search movies" });
  }
});

// Add this new endpoint for TV shows
app.get("/api/tv/popular", async (req, res) => {
  try {
    const response = await tmdbAxios.get("/tv/popular");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
    res.status(500).json({ error: "Failed to fetch popular TV shows" });
  }
});

// Import routes
const movieRoutes = require("./routes/movieRoutes");
const tvRoutes = require("./routes/tvRoutes");
const searchRoutes = require("./routes/searchRoutes");

// Use routes
app.use("/api/movies", movieRoutes);
app.use("/api/tv", tvRoutes);
app.use("/api/search", searchRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "NextFlick API is running" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
