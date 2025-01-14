// src/components/MovieDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PageTitle } from "./PageTitle";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/movies/${id}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <>
      <PageTitle title={movie ? movie.title : "Loading Movie..."} />
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        {/* Add more details as needed */}
      </div>
    </>
  );
}

export default MovieDetails;
