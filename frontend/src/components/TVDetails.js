import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PageTitle } from "./PageTitle";
import "./MediaDetails.css";

function TVDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTVDetails = async () => {
      try {
        const response = await axios.get(
          `${
            process.env.REACT_APP_API_URL || "http://localhost:5001"
          }/api/tv/${id}`
        );
        setShow(response.data);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
        setError(
          error.response?.data?.error || "Failed to load TV show details"
        );
      }
    };

    fetchTVDetails();
  }, [id]);

  if (error) return <div className="error-message">{error}</div>;
  if (!show) return <div className="loading-message">Loading...</div>;

  return (
    <div className="media-details">
      <PageTitle title={show.name} />
      <div className="media-content">
        <div className="media-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
          />
        </div>
        <div className="media-info">
          <h1>{show.name}</h1>
          <p className="overview">{show.overview}</p>
          <div className="media-metadata">
            <p>
              <strong>First Air Date:</strong> {show.first_air_date}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {show.vote_average?.toFixed(1)}/10
            </p>
            {show.number_of_seasons && (
              <p>
                <strong>Seasons:</strong> {show.number_of_seasons}
              </p>
            )}
            {show.number_of_episodes && (
              <p>
                <strong>Episodes:</strong> {show.number_of_episodes}
              </p>
            )}
            {show.status && (
              <p>
                <strong>Status:</strong> {show.status}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TVDetails;
