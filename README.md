# NextFlick
https://next-flick.vercel.app

A full-stack MERN application that allows users to browse and search movies using the TMDB API.

## Features

- 🎬 Browse trending and popular movies
- 🔍 Search functionality
- 👤 User authentication (register/login)
- 🎯 Watchlist and Ratings
- 📱 Responsive design

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- TMDB API Integration

### Frontend

- React Router DOM
- Axios
- Context API for state management
- CSS

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- TMDB API key

### Installation

1. Clone the repository

```bash
git clone https://github.com/ndxnode/nextflick.git
cd nextflick
```

2. Install Backend Dependencies

```bash
cd backend
npm install
```

3. Configure Environment Variables

```bash
# Create a .env file in the backend directory
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
```

4. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the Backend Server

```bash
cd backend
npm run dev
```

2. Start the Frontend Development Server

```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get authenticated user

### Movies

- GET `/api/movies/trending` - Get trending movies
- GET `/api/movies/popular` - Get popular movies

## Screenshots


## Future Improvements

- Add watchlist functionality
- Implement movie ratings
- Add user reviews
- Enhanced search filters
