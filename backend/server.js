const express = require('express');
const cors = require('cors');
const axios = require('axios')
require('dotenv').config();
const MOVIE_API_KEY = process.env.TMDB_API_KEY;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API'})
});
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});
app.get('/api/popular-movies', async (req, res) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API_KEY}`
      );
      res.json(response.data.results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    try {
        const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${query}`
        );
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Get movie details
app.get('/api/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_API_KEY}`
      );
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Add these new endpoints
app.get('/api/movie/:id/recommendations', async (req, res) => {
  const movieId = req.params.id;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${MOVIE_API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tv/popular', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${MOVIE_API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
