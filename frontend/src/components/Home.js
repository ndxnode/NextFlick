import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const API_BASE_URL = 'http://localhost:5000';

    axios.get(`${API_BASE_URL}/api/movies/popular`)
      .then(response => {
        console.log('Movies data:', response.data);
        setMovies(response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Movies error:', error);
        setError(error.message);
        setIsLoading(false);
      });

    axios.get(`${API_BASE_URL}/api/movies/top_rated`)
      .then(response => {
        console.log('TV Shows data:', response.data);
        setTvShows(response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('TV Shows error:', error);
        setError(error.message);
        setIsLoading(false);
      });

    axios.get(`${API_BASE_URL}/api/tv/popular`)
      .then(response => {
        console.log('TV Shows data:', response.data);
        setTvShows(response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('TV Shows error:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movies.length && !tvShows.length) return <div>No content available</div>;

  const scroll = (direction, containerId) => {
    const container = document.getElementById(containerId);
    const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const ContentRow = ({ title, items, type }) => (
    <section className="content-section">
      <h2>{title}</h2>
      <div className="content-row-container">
        <button 
          className="scroll-button left"
          onClick={() => scroll('left', `${type}-container`)}
        >
          <FaChevronLeft />
        </button>
        <div className="content-row" id={`${type}-container`}>
          {items.map(item => (
            <div key={item.id} className="content-card">
              <Link to={`/${type}/${item.id}`}>
                <img 
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                  alt={item.title || item.name}
                />
                <h3>{item.title || item.name}</h3>
              </Link>
            </div>
          ))}
        </div>
        <button 
          className="scroll-button right"
          onClick={() => scroll('right', `${type}-container`)}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );

  return (
    <div className="home-container">
      <ContentRow title="Popular Movies" items={movies} type="movie" />
      <ContentRow title="Popular TV Shows" items={tvShows} type="tv" />
    </div>
  );
}

export default Home;
