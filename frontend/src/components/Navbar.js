import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (user) => {
    if (!user) return '';
    if (user.name) return user.name[0].toUpperCase();
    if (user.firstName) return user.firstName[0].toUpperCase();
    return '';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">NextFlick</Link>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies and TV shows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="user-menu" ref={menuRef}>
        {user ? (
          <>
            <button
              className="user-circle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {getInitials(user)}
            </button>
            {isMenuOpen && (
              <div className="dropdown-menu">
                <div className="user-info">
                  <span className="user-name">
                    {user.name || `${user.firstName} ${user.lastName}`}
                  </span>
                  <span className="user-email">{user.email}</span>
                </div>
                <hr />
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  Profile
                </Link>
                <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                  Settings
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="register-btn">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 