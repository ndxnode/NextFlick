// src/components/MovieDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PageTitle } from "./PageTitle";
import "./MediaDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `${
            process.env.REACT_APP_API_URL || "http://localhost:5001"
          }/api/movies/${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError(error.response?.data?.error || "Failed to load movie details");
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div className="loading-message">Loading...</div>;

  return (
    <div className="media-details">
      <PageTitle title={movie.title} />
      <div className="media-content">
        <div className="media-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="media-info">
          <h1>{movie.title}</h1>
          <p className="overview">{movie.overview}</p>
          <div className="media-metadata">
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1)}/10
            </p>
            {movie.runtime && (
              <p>
                <strong>Runtime:</strong> {movie.runtime} minutes
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
