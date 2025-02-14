import React, { useState } from "react";
import "./SearchFilters.css";

const SearchFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    query: "",
    type: "all", // 'movie', 'tv', or 'all'
    genre: "",
    year: "",
    rating: "",
    sortBy: "popularity.desc",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    onFilterChange(filters);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="search-filters-wrapper">
      <div className="search-bar">
        <div className="search-input-container">
          <input
            type="text"
            name="query"
            value={filters.query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search movies and TV shows..."
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
          <button
            onClick={toggleFilters}
            className={`filter-toggle-button ${isExpanded ? "active" : ""}`}
          >
            Filters {isExpanded ? "▼" : "▲"}
          </button>
        </div>
      </div>

      <div className={`advanced-filters ${isExpanded ? "expanded" : ""}`}>
        <div className="filters-container">
          <select
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>

          <select
            name="genre"
            value={filters.genre}
            onChange={handleInputChange}
            className="filter-select"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="year"
            value={filters.year}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Year"
            className="filter-input"
            min="1900"
            max={new Date().getFullYear()}
          />

          <select
            name="rating"
            value={filters.rating}
            onChange={handleInputChange}
            className="filter-select"
          >
            <option value="">Rating</option>
            <option value="7">7+ ⭐</option>
            <option value="8">8+ ⭐</option>
            <option value="9">9+ ⭐</option>
          </select>

          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleInputChange}
            className="filter-select"
          >
            <option value="popularity.desc">Most Popular</option>
            <option value="vote_average.desc">Highest Rated</option>
            <option value="release_date.desc">Newest</option>
            <option value="release_date.asc">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
