import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Search.css";
import { PageTitle } from "./PageTitle";
import SearchFilters from "./SearchFilters";

function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredContent, setFilteredContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(true);

  // Get the search query from URL parameters
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      handleSearch({ query });
    }
  }, [searchParams]);

  const handleSearch = async (filters) => {
    setIsLoading(true);
    setError(null);

    try {
      const API_BASE_URL = "http://localhost:5001";
      const params = new URLSearchParams();

      if (filters.query) {
        params.append("query", filters.query);
        // Update URL with search query
        navigate(`/search?q=${filters.query}`);
      }
      if (filters.type !== "all") params.append("type", filters.type);
      if (filters.genre) params.append("genre", filters.genre);
      if (filters.year) params.append("year", filters.year);
      if (filters.rating) params.append("rating", filters.rating);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);

      const response = await axios.get(
        `${API_BASE_URL}/api/search?${params.toString()}`
      );

      if (response.data.results.length === 0) {
        setFilteredContent([]);
      } else {
        setFilteredContent(response.data.results);
        setShowFilters(false); // Hide filters after successful search
      }
    } catch (error) {
      console.error("Error searching content:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const SearchResults = ({ items }) => (
    <div className="search-results">
      <div className="search-header">
        <h2>Search Results</h2>
        <button className="new-search-btn" onClick={() => setShowFilters(true)}>
          New Search
        </button>
      </div>
      <div className="results-grid">
        {items.map((item) => (
          <div key={item.id} className="result-card">
            <Link to={`/${item.media_type}/${item.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
              />
              <h3>{item.title || item.name}</h3>
              {item.vote_average && (
                <div className="rating">⭐ {item.vote_average.toFixed(1)}</div>
              )}
              <div className="type-badge">
                {item.media_type === "movie" ? "Movie" : "TV Show"}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <PageTitle title="Search" />
      <div className="search-container">
        {showFilters && <SearchFilters onFilterChange={handleSearch} />}

        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : filteredContent.length > 0 ? (
          <SearchResults items={filteredContent} />
        ) : showFilters ? null : (
          <div className="no-results">No results found</div>
        )}
      </div>
    </>
  );
}

export default Search;
