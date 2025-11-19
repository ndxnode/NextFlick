# CLAUDE.md - NextFlick AI Assistant Guide

**Last Updated**: 2025-11-19
**Project**: NextFlick - Movie & TV Show Companion
**Type**: Full-Stack MERN Application
**Production URL**: https://next-flick.vercel.app

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Code Conventions](#code-conventions)
6. [Architecture Patterns](#architecture-patterns)
7. [API Reference](#api-reference)
8. [Database Models](#database-models)
9. [Authentication System](#authentication-system)
10. [Common Tasks](#common-tasks)
11. [Testing Guidelines](#testing-guidelines)
12. [Known Issues](#known-issues)
13. [Best Practices](#best-practices)

---

## Project Overview

NextFlick is a full-stack web application that allows users to browse, search, and manage watchlists for movies and TV shows using the TMDB (The Movie Database) API.

### Key Features
- Browse trending, popular, and top-rated movies/TV shows
- Advanced search with filters (genre, year, rating, type)
- User authentication (register/login with JWT)
- Personal watchlist management with statuses (planning, watching, completed, dropped)
- Progress tracking and rating system
- User profiles with bio and profile pictures
- Responsive design

### Architecture
- **Type**: Monorepo with separate backend and frontend directories
- **Pattern**: MVC on backend, Component-based architecture on frontend
- **Communication**: RESTful API over HTTP
- **Database**: MongoDB with Mongoose ODM
- **State Management**: React Context API (no Redux)

---

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v4.21.1
- **Database**: MongoDB (via Mongoose v8.8.1)
- **Authentication**: JWT (jsonwebtoken v9.0.2) + bcryptjs v2.4.3
- **Validation**: express-validator v7.2.0
- **File Upload**: Multer (in middleware/upload.js)
- **HTTP Client**: Axios v1.7.7 (for TMDB API)
- **Email**: Nodemailer v6.10.0
- **Dev Tool**: nodemon v3.1.7

### Frontend
- **Framework**: React v18.3.1
- **Routing**: React Router DOM v6.28.0
- **HTTP Client**: Axios v1.7.7
- **UI Components**: React Icons v5.3.0
- **Notifications**: React Toastify v11.0.3
- **Build Tool**: Create React App (react-scripts v5.0.1)
- **Testing**: Jest + React Testing Library

### External Services
- **TMDB API**: Movie and TV show data
- **MongoDB Atlas**: Database hosting (assumed)
- **Vercel**: Frontend deployment

---

## Project Structure

```
NextFlick/
├── README.md                 # User documentation
├── mermaid.md               # Architecture diagrams
├── CLAUDE.md                # This file
├── .gitignore
│
├── backend/                 # Node.js/Express backend
│   ├── server.js           # Main entry point (port 5001)
│   ├── app.js              # Express app configuration
│   ├── package.json
│   │
│   ├── controllers/        # Business logic layer
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── watchlistController.js
│   │   └── searchController.js
│   │
│   ├── middleware/         # Express middleware
│   │   ├── auth.js         # JWT authentication
│   │   └── upload.js       # Multer file upload config
│   │
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   └── Watchlist.js
│   │
│   └── routes/             # API route definitions
│       ├── authRoutes.js
│       ├── userRoutes.js
│       ├── watchlistRoutes.js
│       ├── movieRoutes.js
│       ├── tvRoutes.js
│       └── searchRoutes.js
│
└── frontend/               # React frontend
    ├── public/             # Static assets
    │   ├── index.html
    │   └── [icons, manifest, robots.txt]
    │
    ├── src/
    │   ├── index.js        # Application entry point
    │   ├── App.jsx         # Main routing component (ACTIVE)
    │   ├── App.js          # (DEPRECATED - duplicate)
    │   │
    │   ├── components/     # React components
    │   │   ├── Home.js & Home.css
    │   │   ├── Login.js & Auth.css
    │   │   ├── Register.js
    │   │   ├── Navbar.js & Navbar.css
    │   │   ├── Layout.jsx
    │   │   ├── Search.js & SearchFilters.js
    │   │   ├── MovieDetails.js & TVDetails.js
    │   │   ├── MovieList.js
    │   │   ├── PageTitle.js
    │   │   │
    │   │   ├── common/     # Reusable components
    │   │   │   ├── MediaCard.jsx
    │   │   │   ├── AddToWatchlistButton.jsx
    │   │   │   └── ErrorMessage.jsx
    │   │   │
    │   │   └── profile/    # Profile feature components
    │   │       ├── ProfilePage.jsx
    │   │       ├── ProfileInfo.jsx
    │   │       ├── ProfileEdit.jsx
    │   │       ├── ProfilePicture.jsx
    │   │       └── WatchlistSection.jsx
    │   │
    │   ├── context/        # React Context providers
    │   │   └── AuthContext.js
    │   │
    │   └── utils/          # Utility functions
    │       ├── api.js      # Backend API client
    │       ├── tmdbApi.js  # TMDB API client
    │       └── dateUtils.js
    │
    └── package.json
```

---

## Development Workflow

### Initial Setup

1. **Clone and Install**
   ```bash
   git clone <repo-url>
   cd NextFlick

   # Backend setup
   cd backend
   npm install

   # Frontend setup
   cd ../frontend
   npm install
   ```

2. **Environment Variables**

   **Backend** (`/backend/.env`):
   ```env
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_super_secret_key_here
   TMDB_API_KEY=your_tmdb_api_key
   PORT=5001
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend** (`/frontend/.env`):
   ```env
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key
   REACT_APP_API_URL=http://localhost:5001
   ```

   **Get TMDB API Key**: https://www.themoviedb.org/settings/api

3. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev    # Runs on port 5001 with nodemon

   # Terminal 2 - Frontend
   cd frontend
   npm start      # Runs on port 3000
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

### Git Workflow

This project uses feature branches with the naming convention:
```
claude/claude-md-<session-id>-<unique-id>
```

**Important**: Always develop on the designated branch, never push directly to main.

**Standard workflow**:
```bash
# Check current branch
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add watchlist filtering feature"

# Push to remote (use -u for first push)
git push -u origin <branch-name>
```

### Making Changes

#### Backend Changes
1. **Adding new API endpoint**:
   - Define route in `/backend/routes/` (e.g., `movieRoutes.js`)
   - Create controller function in `/backend/controllers/`
   - Add validation if needed (express-validator)
   - Test endpoint with curl or Postman

2. **Adding new database model**:
   - Create schema in `/backend/models/`
   - Follow Mongoose patterns (see User.js, Watchlist.js)
   - Add indexes if needed
   - Update controllers to use new model

#### Frontend Changes
1. **Adding new component**:
   - Create component in appropriate directory (`/components/`, `/components/common/`, or `/components/<feature>/`)
   - Create corresponding CSS file
   - Export from component file
   - Import and use in parent component

2. **Adding new route**:
   - Add route definition in `App.jsx`
   - Use `<Route path="..." element={<Component />} />`
   - For protected routes, wrap in auth check

3. **Adding API call**:
   - Add function to `/utils/api.js` (for backend APIs)
   - Or add to `/utils/tmdbApi.js` (for TMDB direct calls)
   - Use async/await pattern
   - Handle errors with try-catch

---

## Code Conventions

### Naming Conventions

#### Files
- **React Components**: PascalCase with `.js` or `.jsx` extension
  - Examples: `ProfilePage.jsx`, `MediaCard.jsx`, `AddToWatchlistButton.jsx`
- **Utilities**: camelCase with `.js` extension
  - Examples: `api.js`, `tmdbApi.js`, `dateUtils.js`
- **Styles**: Match component name but with `.css`
  - Examples: `ProfilePage.jsx` → `Profile.css`, `Navbar.js` → `Navbar.css`
- **Backend Models**: PascalCase
  - Examples: `User.js`, `Watchlist.js`
- **Backend Routes**: camelCase with "Routes" suffix
  - Examples: `authRoutes.js`, `movieRoutes.js`
- **Backend Controllers**: camelCase with "Controller" suffix
  - Examples: `authController.js`, `userController.js`

#### Variables & Functions
- **Variables/Functions**: camelCase
  - Examples: `userData`, `fetchMovies`, `isAuthenticated`
- **React Components**: PascalCase
  - Examples: `ProfilePage`, `MediaCard`, `AuthContext`
- **Constants**: UPPER_SNAKE_CASE
  - Examples: `TMDB_BASE_URL`, `JWT_EXPIRES_IN`
- **MongoDB Models**: PascalCase
  - Examples: `User`, `Watchlist`

#### API Endpoints
- **RESTful convention**: `/api/resource` or `/api/resource/:id`
- **Plural nouns** for collections: `/api/movies`, `/api/users`
- **Nested resources**: `/api/watchlist/items/:mediaId`
- **Action-based** when not CRUD: `/api/auth/login`, `/api/users/change-password`

### File Organization

#### Component Structure
```javascript
// Imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ComponentName.css';

// Component definition
const ComponentName = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState(null);
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

#### Controller Structure
```javascript
// Imports
const Model = require('../models/Model');

// Controller function
const controllerFunction = async (req, res) => {
  try {
    // Validation
    const { param1, param2 } = req.body;

    // Business logic
    const result = await Model.findOne({ param1 });

    // Response
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error in controllerFunction:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = { controllerFunction };
```

### Code Style

#### JavaScript/React
- **Indentation**: 2 spaces (standard in project)
- **Quotes**: Single quotes preferred ('text')
- **Semicolons**: Inconsistent in project (some files use, some don't)
- **Arrow Functions**: Preferred for functional components and callbacks
- **Async/Await**: Preferred over .then() chains
- **Destructuring**: Use when accessing multiple properties
  ```javascript
  const { firstName, lastName, email } = req.body;
  ```

#### CSS
- **Class Naming**: kebab-case
  - Examples: `.profile-page`, `.media-card`, `.add-to-watchlist-btn`
- **BEM Convention**: Not strictly followed, but component-scoped classes used
- **Responsive**: Use media queries where needed

### Import Order
```javascript
// 1. React and third-party libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 2. Context and utilities
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

// 3. Components
import MediaCard from './common/MediaCard';

// 4. Styles
import './ComponentName.css';
```

---

## Architecture Patterns

### Backend: MVC Pattern

**Models** (`/backend/models/`)
- Define database schemas using Mongoose
- Include methods and virtuals
- Handle data validation
- Example: User model with password hashing, Watchlist with embedded items

**Controllers** (`/backend/controllers/`)
- Contain business logic
- Handle request/response
- Interact with models
- No direct route definitions
- Example: authController handles registration, login, token generation

**Routes** (`/backend/routes/`)
- Define API endpoints
- Apply middleware (auth, validation)
- Delegate to controllers
- Keep thin - no business logic
- Example: authRoutes defines POST /register, applies validation, calls authController

**Middleware** (`/backend/middleware/`)
- `auth.js`: JWT verification, attaches user to req.user
- `upload.js`: Multer configuration for file uploads

### Frontend: Component-Based Architecture

**Container/Presentational Pattern**
- **Container Components**: Handle state and logic (ProfilePage, Search)
- **Presentational Components**: Receive props, render UI (ProfileInfo, MediaCard)

**Feature-Based Organization**
- Group related components in subdirectories
- Example: `/components/profile/` contains all profile-related components
- `/components/common/` for truly reusable components

**Context API for Global State**
- `AuthContext` provides authentication state app-wide
- Alternative to Redux for simpler state management
- Provider wraps App in index.js

**Custom Hooks** (Emerging Pattern)
- `useAuth()` hook from AuthContext
- Consider creating more for reusable logic

### Data Flow

```
Frontend Component
    ↓ (user action)
API Call (utils/api.js)
    ↓ (HTTP request)
Backend Route (routes/)
    ↓ (middleware)
Auth Middleware (if protected)
    ↓
Controller (controllers/)
    ↓
Model (models/)
    ↓
MongoDB Database
    ↑
Response to Frontend
    ↑
State Update (useState/Context)
    ↑
Component Re-render
```

---

## API Reference

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/register`
Register a new user.

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "gender": "male",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200):
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "gender": "male"
  }
}
```

**Validation**:
- firstName: required, string, trimmed
- lastName: required, string, trimmed
- gender: required, enum ['male', 'female', 'other']
- email: required, valid email, unique
- password: required, min 6 characters

#### POST `/api/auth/login`
Authenticate user and return JWT token.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200):
```json
{
  "token": "jwt_token_here",
  "user": { /* user object */ }
}
```

#### GET `/api/auth/me`
Get authenticated user data. **Protected route**.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "user": { /* user object */ }
}
```

---

### User Routes (`/api/users`)

All user routes are **protected** - require authentication.

#### GET `/api/users/profile`
Get current user's profile.

#### PATCH `/api/users/profile`
Update user profile.

**Request Body** (all optional):
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "username": "johnsmith",
  "bio": "Movie enthusiast",
  "dateOfBirth": "1990-01-01"
}
```

#### POST `/api/users/change-password`
Change user password.

**Request Body**:
```json
{
  "currentPassword": "oldpass123",
  "newPassword": "newpass123"
}
```

#### POST `/api/users/profile-picture`
Upload profile picture. **Multipart/form-data**.

**Form Data**:
- `profilePicture`: image file (jpeg, jpg, png)
- Max size: 5MB

---

### Movie Routes (`/api/movies`)

#### GET `/api/movies/trending`
Get trending movies (weekly).

**Response**: Array of movie objects from TMDB

#### GET `/api/movies/popular`
Get popular movies.

#### GET `/api/movies/top_rated`
Get top-rated movies.

#### GET `/api/movies/:id`
Get movie details by TMDB ID.

**Query Params**: `append_to_response=videos,credits`

**Response**: Full movie details including videos and cast

---

### TV Routes (`/api/tv`)

#### GET `/api/tv/popular`
Get popular TV shows.

#### GET `/api/tv/top_rated`
Get top-rated TV shows.

#### GET `/api/tv/:id`
Get TV show details by TMDB ID.

---

### Search Routes (`/api/search`)

#### GET `/api/search`
Search movies and TV shows with filters.

**Query Parameters**:
- `query`: Search query string (required)
- `type`: Filter by type ('movie' | 'tv')
- `genre`: Genre ID
- `year`: Release year
- `rating`: Minimum rating (0-10)
- `sortBy`: Sort order ('popularity.desc', 'vote_average.desc', etc.)

**Example**:
```
/api/search?query=inception&type=movie&rating=7
```

---

### Watchlist Routes (`/api/watchlist`)

All watchlist routes are **protected**.

#### GET `/api/watchlist`
Get user's full watchlist.

**Response**:
```json
{
  "_id": "watchlist_id",
  "userId": "user_id",
  "items": [
    {
      "mediaId": "550",
      "mediaType": "movie",
      "status": "watching",
      "progress": 50,
      "rating": 8.5,
      "notes": "Great movie!",
      "dateAdded": "2025-01-01T00:00:00.000Z",
      "dateUpdated": "2025-01-02T00:00:00.000Z"
    }
  ],
  "lastUpdated": "2025-01-02T00:00:00.000Z"
}
```

#### POST `/api/watchlist/items`
Add item to watchlist.

**Request Body**:
```json
{
  "mediaId": "550",
  "mediaType": "movie",
  "status": "planning"
}
```

**Status Options**: 'planning' (default), 'watching', 'completed', 'dropped'

#### PATCH `/api/watchlist/items/:mediaId`
Update watchlist item.

**Request Body** (all optional):
```json
{
  "status": "completed",
  "progress": 100,
  "rating": 9,
  "notes": "Amazing film!"
}
```

#### DELETE `/api/watchlist/items/:mediaId`
Remove item from watchlist.

#### GET `/api/watchlist/status/:status`
Get items filtered by status.

**Status Options**: 'planning', 'watching', 'completed', 'dropped'

---

## Database Models

### User Model (`/backend/models/User.js`)

```javascript
{
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    sparse: true  // Allows null values to be non-unique
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profilePicture: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: null
  },
  watchlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Watchlist',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

**Virtuals**:
- `name`: Returns `${firstName} ${lastName}`

**Methods**:
- `toJSON()`: Removes password field from JSON output

**Pre-Save Hook**:
- Hashes password with bcrypt (10 salt rounds) before saving

**Indexes**:
- email (unique)
- username (unique, sparse)

---

### Watchlist Model (`/backend/models/Watchlist.js`)

```javascript
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [WatchlistItemSchema],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}
```

**WatchlistItem Schema**:
```javascript
{
  mediaId: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    enum: ['movie', 'tv'],
    required: true
  },
  status: {
    type: String,
    enum: ['planning', 'watching', 'completed', 'dropped'],
    default: 'planning'
  },
  progress: {
    type: Number,
    min: 0,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: null
  },
  notes: {
    type: String,
    default: null
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
}
```

**Methods**:
- `getItemsByStatus(status)`: Returns items filtered by status

**Pre-Save Hook**:
- Updates `lastUpdated` when items array is modified

**Indexes**:
- userId (unique)
- items.mediaId (for efficient lookups)

---

## Authentication System

### JWT Token Authentication

**Token Generation** (authController.js):
```javascript
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
```

**Token Storage**:
- Client-side: Stored in AuthContext state (memory)
- Not stored in localStorage or sessionStorage
- Sent with requests via Authorization header

**Token Verification** (middleware/auth.js):
```javascript
// Extract from header
const token = req.headers.authorization?.split(' ')[1];

// OR from cookies
const token = req.cookies.token;

// Verify
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// Attach user to request
req.user = await User.findById(decoded.userId);
```

### Authentication Flow

#### Registration Flow
1. User fills registration form (Login.js/Register.js)
2. Frontend calls `AuthContext.register(userData)`
3. POST request to `/api/auth/register`
4. Backend validates input (express-validator)
5. Password hashed with bcrypt (10 salt rounds)
6. User saved to MongoDB
7. Watchlist document created and linked
8. JWT token generated (7-day expiration)
9. Response: `{ token, user }`
10. AuthContext updates state with user and token
11. User redirected to home/profile

#### Login Flow
1. User submits email and password
2. Frontend calls `AuthContext.login(email, password)`
3. POST request to `/api/auth/login`
4. Backend finds user by email
5. Password verified with `bcrypt.compare()`
6. JWT token generated
7. Response: `{ token, user }`
8. AuthContext updates state
9. User redirected

#### Protected Route Access
1. User navigates to protected route
2. Component checks `isAuthenticated` from AuthContext
3. If not authenticated, redirect to login
4. If authenticated, token sent with API requests
5. Backend middleware verifies token
6. If valid, user object attached to `req.user`
7. Route handler executes
8. If invalid, 401 Unauthorized response

#### Session Persistence
1. On app load, AuthContext calls `checkAuth()`
2. GET request to `/api/users/profile` with token
3. If successful, user state updated
4. If failed (401), user logged out

### Password Security

**Hashing** (User model pre-save):
```javascript
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

**Verification**:
```javascript
const isMatch = await bcrypt.compare(password, user.password);
```

**Password Change**:
1. User provides current password + new password
2. Current password verified
3. New password hashed
4. User document updated
5. Consider: Force re-login after password change

### CORS Configuration

**Backend** (server.js):
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**Frontend** (utils/api.js):
```javascript
const api = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true
});
```

---

## Common Tasks

### Adding a New API Endpoint

**Example**: Add endpoint to get user's favorite movies

1. **Define route** (`/backend/routes/userRoutes.js`):
   ```javascript
   const express = require('express');
   const router = express.Router();
   const auth = require('../middleware/auth');
   const { getFavoriteMovies } = require('../controllers/userController');

   router.get('/favorites/movies', auth, getFavoriteMovies);

   module.exports = router;
   ```

2. **Create controller** (`/backend/controllers/userController.js`):
   ```javascript
   const getFavoriteMovies = async (req, res) => {
     try {
       const userId = req.user._id;

       // Business logic here
       const favorites = await Watchlist.findOne({ userId })
         .where('items.mediaType').equals('movie')
         .where('items.rating').gte(8);

       res.status(200).json({
         success: true,
         data: favorites
       });
     } catch (error) {
       console.error('Error fetching favorites:', error);
       res.status(500).json({
         success: false,
         message: 'Failed to fetch favorite movies'
       });
     }
   };

   module.exports = { getFavoriteMovies };
   ```

3. **Add frontend API call** (`/frontend/src/utils/api.js`):
   ```javascript
   export const getFavoriteMovies = async () => {
     try {
       const response = await api.get('/api/users/favorites/movies');
       return response.data;
     } catch (error) {
       throw error;
     }
   };
   ```

4. **Use in component**:
   ```javascript
   import { getFavoriteMovies } from '../utils/api';

   const FavoritesPage = () => {
     const [favorites, setFavorites] = useState([]);

     useEffect(() => {
       const fetchFavorites = async () => {
         try {
           const data = await getFavoriteMovies();
           setFavorites(data.data);
         } catch (error) {
           console.error('Error:', error);
         }
       };

       fetchFavorites();
     }, []);

     return (
       <div>
         {favorites.map(movie => (
           <MediaCard key={movie.mediaId} item={movie} />
         ))}
       </div>
     );
   };
   ```

### Adding a New React Component

**Example**: Create a RecommendationsSection component

1. **Create component file** (`/frontend/src/components/profile/RecommendationsSection.jsx`):
   ```javascript
   import React, { useState, useEffect } from 'react';
   import { getRecommendations } from '../../utils/api';
   import MediaCard from '../common/MediaCard';
   import './Recommendations.css';

   const RecommendationsSection = ({ userId }) => {
     const [recommendations, setRecommendations] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       const fetchRecommendations = async () => {
         try {
           const data = await getRecommendations();
           setRecommendations(data.data);
         } catch (error) {
           console.error('Error:', error);
         } finally {
           setLoading(false);
         }
       };

       fetchRecommendations();
     }, [userId]);

     if (loading) return <div>Loading...</div>;

     return (
       <div className="recommendations-section">
         <h2>Recommended for You</h2>
         <div className="recommendations-grid">
           {recommendations.map(item => (
             <MediaCard key={item.id} item={item} />
           ))}
         </div>
       </div>
     );
   };

   export default RecommendationsSection;
   ```

2. **Create styles** (`/frontend/src/components/profile/Recommendations.css`):
   ```css
   .recommendations-section {
     padding: 20px;
   }

   .recommendations-grid {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
     gap: 20px;
   }
   ```

3. **Import and use in parent** (`/frontend/src/components/profile/ProfilePage.jsx`):
   ```javascript
   import RecommendationsSection from './RecommendationsSection';

   // Inside component
   return (
     <div className="profile-page">
       <ProfileInfo user={user} />
       <WatchlistSection />
       <RecommendationsSection userId={user._id} />
     </div>
   );
   ```

### Adding a New Database Model

**Example**: Create a Review model

1. **Create model file** (`/backend/models/Review.js`):
   ```javascript
   const mongoose = require('mongoose');

   const reviewSchema = new mongoose.Schema({
     userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
     },
     mediaId: {
       type: String,
       required: true
     },
     mediaType: {
       type: String,
       enum: ['movie', 'tv'],
       required: true
     },
     rating: {
       type: Number,
       required: true,
       min: 0,
       max: 10
     },
     reviewText: {
       type: String,
       required: true,
       minlength: 10,
       maxlength: 1000
     },
     likes: {
       type: Number,
       default: 0
     },
     createdAt: {
       type: Date,
       default: Date.now
     },
     updatedAt: {
       type: Date,
       default: Date.now
     }
   }, {
     timestamps: true
   });

   // Indexes
   reviewSchema.index({ userId: 1, mediaId: 1 }, { unique: true });
   reviewSchema.index({ mediaId: 1 });

   // Methods
   reviewSchema.methods.incrementLikes = function() {
     this.likes += 1;
     return this.save();
   };

   const Review = mongoose.model('Review', reviewSchema);

   module.exports = Review;
   ```

2. **Create controller** (`/backend/controllers/reviewController.js`):
   ```javascript
   const Review = require('../models/Review');

   const createReview = async (req, res) => {
     try {
       const { mediaId, mediaType, rating, reviewText } = req.body;
       const userId = req.user._id;

       const review = new Review({
         userId,
         mediaId,
         mediaType,
         rating,
         reviewText
       });

       await review.save();

       res.status(201).json({
         success: true,
         data: review
       });
     } catch (error) {
       if (error.code === 11000) {
         return res.status(400).json({
           success: false,
           message: 'You have already reviewed this item'
         });
       }

       console.error('Error creating review:', error);
       res.status(500).json({
         success: false,
         message: 'Failed to create review'
       });
     }
   };

   module.exports = { createReview };
   ```

3. **Create routes** (`/backend/routes/reviewRoutes.js`):
   ```javascript
   const express = require('express');
   const router = express.Router();
   const auth = require('../middleware/auth');
   const { createReview, getReviews } = require('../controllers/reviewController');
   const { body } = require('express-validator');

   router.post('/',
     auth,
     [
       body('mediaId').notEmpty(),
       body('mediaType').isIn(['movie', 'tv']),
       body('rating').isFloat({ min: 0, max: 10 }),
       body('reviewText').isLength({ min: 10, max: 1000 })
     ],
     createReview
   );

   router.get('/media/:mediaId', getReviews);

   module.exports = router;
   ```

4. **Register routes** (`/backend/server.js` or `/backend/app.js`):
   ```javascript
   const reviewRoutes = require('./routes/reviewRoutes');

   app.use('/api/reviews', reviewRoutes);
   ```

### Adding Authentication to a Route

**Example**: Protect a route with JWT authentication

1. **Import auth middleware**:
   ```javascript
   const auth = require('../middleware/auth');
   ```

2. **Apply to route**:
   ```javascript
   router.get('/protected-route', auth, controllerFunction);
   ```

3. **Access authenticated user in controller**:
   ```javascript
   const controllerFunction = async (req, res) => {
     const userId = req.user._id;     // User object attached by auth middleware
     const userEmail = req.user.email;

     // Continue with logic...
   };
   ```

### Updating Environment Variables

1. **Add to `.env` file**:
   ```env
   NEW_API_KEY=your_api_key_here
   ```

2. **Access in code**:
   ```javascript
   const apiKey = process.env.NEW_API_KEY;
   ```

3. **Restart server** (nodemon should auto-restart in dev mode)

4. **Never commit `.env` files** (already in .gitignore)

---

## Testing Guidelines

### Current State
- **Backend**: No tests configured
- **Frontend**: Minimal test coverage, Jest/RTL infrastructure in place

### Testing Setup (Frontend)

**Running Tests**:
```bash
cd frontend
npm test
```

**Test File Convention**:
- Place test files next to components: `ComponentName.test.js`
- Or in `__tests__` directory

**Example Test** (MediaCard.test.js):
```javascript
import { render, screen } from '@testing-library/react';
import MediaCard from './MediaCard';

describe('MediaCard', () => {
  const mockItem = {
    mediaId: '550',
    mediaType: 'movie',
    status: 'watching',
    progress: 50
  };

  test('renders media card with progress', () => {
    render(<MediaCard item={mockItem} />);

    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  test('displays correct status badge', () => {
    render(<MediaCard item={mockItem} />);

    expect(screen.getByText('Watching')).toBeInTheDocument();
  });
});
```

### Testing Best Practices

1. **Test user interactions**, not implementation details
2. **Use semantic queries**: `getByRole`, `getByLabelText` over `getByTestId`
3. **Mock external dependencies**: API calls, TMDB API
4. **Test error states**: Network failures, validation errors
5. **Test loading states**: Async data fetching

### Recommended Testing Additions

**Backend** (using Jest + Supertest):
```bash
cd backend
npm install --save-dev jest supertest
```

**Example API test**:
```javascript
const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {
  test('POST /api/auth/register creates user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        gender: 'male',
        email: 'john@test.com',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe('john@test.com');
  });
});
```

---

## Known Issues

### Critical Issues

1. **Duplicate App Files**
   - **Issue**: Both `App.js` and `App.jsx` exist
   - **Active File**: `App.jsx`
   - **Action**: Remove `App.js` to avoid confusion
   - **Location**: `/frontend/src/App.js`

2. **Logout Endpoint Missing**
   - **Issue**: Frontend calls `/api/auth/logout` but endpoint not implemented
   - **Impact**: Logout is client-side only (clears state)
   - **Action**: Implement backend logout if needed (e.g., token blacklist)
   - **Location**: `AuthContext.js` calls non-existent endpoint

3. **Mixed Authentication Methods**
   - **Issue**: Code checks both Authorization header AND cookies for token
   - **Impact**: Potential confusion, inconsistent behavior
   - **Action**: Standardize on one method (prefer Authorization header)
   - **Location**: `/backend/middleware/auth.js`

### File Path Issues

4. **Incorrect Import Path**
   - **Issue**: `App.jsx` imports from `./components/auth/Login` but Login.js is in `/components/`
   - **Current**: Import still works (possibly resolved by bundler)
   - **Action**: Update import path to `./components/Login`
   - **Location**: `/frontend/src/App.jsx`

### Incomplete Features

5. **File Upload Not Fully Implemented**
   - **Issue**: `uploadToStorage` function referenced but not defined
   - **Impact**: Profile picture upload may not work
   - **Action**: Implement storage solution (AWS S3, Cloudinary, etc.)
   - **Location**: `/backend/controllers/userController.js`

6. **No API Documentation**
   - **Issue**: No Swagger/OpenAPI specification
   - **Impact**: Developers must read code to understand API
   - **Action**: Add Swagger or create API documentation
   - **Location**: N/A

7. **No Error Boundaries**
   - **Issue**: React app has no error boundaries
   - **Impact**: App crashes on component errors
   - **Action**: Add error boundaries to catch and handle errors gracefully
   - **Location**: Wrap App or major sections

### Testing Gaps

8. **Minimal Test Coverage**
   - **Issue**: No backend tests, minimal frontend tests
   - **Impact**: Reduced confidence in code changes
   - **Action**: Add comprehensive test suites
   - **Location**: All components and controllers

### Performance

9. **No Pagination**
   - **Issue**: Watchlist and search results not paginated
   - **Impact**: Performance issues with large datasets
   - **Action**: Implement pagination on backend and frontend
   - **Location**: Search, Watchlist, Movie lists

10. **No Caching**
    - **Issue**: No caching of TMDB API responses
    - **Impact**: Repeated API calls for same data
    - **Action**: Implement caching (Redis, in-memory, or HTTP caching)
    - **Location**: Movie/TV routes, TMDB API calls

---

## Best Practices

### For AI Assistants Working on This Codebase

#### General Guidelines

1. **Always Read Before Writing**
   - Use Read tool to examine existing files before making changes
   - Understand current patterns and conventions
   - Match existing code style

2. **Maintain Separation of Concerns**
   - Backend: Keep routes thin, logic in controllers
   - Frontend: Separate UI from business logic
   - Use appropriate directories for new files

3. **Follow Naming Conventions**
   - Refer to [Code Conventions](#code-conventions) section
   - Match existing file naming patterns
   - Use descriptive, self-documenting names

4. **Error Handling**
   - Always wrap async operations in try-catch
   - Return appropriate HTTP status codes
   - Log errors for debugging (console.error)
   - Show user-friendly error messages on frontend

5. **Security First**
   - Never expose sensitive data (passwords, secrets)
   - Validate all user input
   - Use authentication middleware for protected routes
   - Sanitize data before database operations
   - Avoid SQL injection, XSS, CSRF vulnerabilities

#### When Adding Features

1. **Plan First**
   - Understand the feature requirements
   - Identify affected files (backend + frontend)
   - Consider data model changes
   - Plan API endpoints if needed

2. **Backend First Approach**
   - Create/update models if needed
   - Implement API endpoints
   - Test with curl or Postman
   - Then build frontend

3. **Incremental Development**
   - Build one component at a time
   - Test frequently during development
   - Commit working increments

4. **Documentation**
   - Update this CLAUDE.md if adding major features
   - Add JSDoc comments for complex functions
   - Update README.md if user-facing changes

#### When Fixing Bugs

1. **Reproduce First**
   - Understand the bug thoroughly
   - Identify root cause
   - Check for similar issues elsewhere

2. **Minimal Changes**
   - Fix only what's needed
   - Avoid refactoring during bug fixes
   - Test the specific bug scenario

3. **Consider Side Effects**
   - Check if fix affects other features
   - Test related functionality
   - Review dependent code

#### Code Quality

1. **DRY (Don't Repeat Yourself)**
   - Extract repeated code into utilities
   - Create reusable components
   - Use shared constants

2. **KISS (Keep It Simple)**
   - Avoid over-engineering
   - Use straightforward solutions
   - Match existing complexity level

3. **Consistent Formatting**
   - Use 2-space indentation
   - Follow existing code style
   - Use Prettier/ESLint if available

4. **Meaningful Comments**
   - Explain "why", not "what"
   - Document complex logic
   - Remove dead code and outdated comments

#### Git Practices

1. **Descriptive Commit Messages**
   ```
   Add watchlist filtering by rating

   - Added rating filter dropdown to WatchlistSection
   - Updated API to accept rating query parameter
   - Added sorting by rating in watchlist controller
   ```

2. **Atomic Commits**
   - One logical change per commit
   - Each commit should work independently
   - Don't mix refactoring with features

3. **Branch Naming**
   - Use provided branch name (claude/...)
   - Don't switch branches without permission

#### API Design

1. **RESTful Conventions**
   - Use appropriate HTTP methods (GET, POST, PATCH, DELETE)
   - Return consistent response format
   - Use proper status codes

2. **Response Format**
   ```javascript
   // Success
   {
     "success": true,
     "data": { /* result */ }
   }

   // Error
   {
     "success": false,
     "message": "Error description"
   }
   ```

3. **Validation**
   - Validate all inputs with express-validator
   - Return clear validation error messages
   - Sanitize user input

#### React Best Practices

1. **Component Design**
   - Keep components focused (single responsibility)
   - Extract reusable logic into custom hooks
   - Use prop-types or TypeScript for type checking (if available)

2. **State Management**
   - Use local state when possible
   - Context for truly global state
   - Avoid prop drilling

3. **Performance**
   - Use React.memo for expensive components
   - Optimize re-renders with useMemo/useCallback
   - Lazy load routes/components if needed

4. **Accessibility**
   - Use semantic HTML
   - Add ARIA labels where needed
   - Ensure keyboard navigation works

#### Database Operations

1. **Query Optimization**
   - Use indexes for frequently queried fields
   - Avoid N+1 queries
   - Use projection to limit returned fields

2. **Data Integrity**
   - Use Mongoose validation
   - Add unique constraints where appropriate
   - Handle duplicate key errors gracefully

3. **Transactions** (when needed)
   - Use for multi-document operations
   - Ensure atomicity of related changes

---

## Quick Reference

### Environment Variables

**Backend** (`/backend/.env`):
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_here
TMDB_API_KEY=your_tmdb_key
PORT=5001
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`/frontend/.env`):
```env
REACT_APP_TMDB_API_KEY=your_tmdb_key
REACT_APP_API_URL=http://localhost:5001
```

### Useful Commands

**Development**:
```bash
# Backend
cd backend
npm run dev          # Start with nodemon (port 5001)

# Frontend
cd frontend
npm start            # Start development server (port 3000)

# Both (from root)
# Terminal 1
cd backend && npm run dev
# Terminal 2
cd frontend && npm start
```

**Production**:
```bash
# Backend
cd backend
npm start            # Production server

# Frontend
cd frontend
npm run build        # Build to /build directory
# Serve build/ with static file server
```

**Testing**:
```bash
# Frontend
cd frontend
npm test             # Run Jest tests
npm test -- --coverage  # With coverage report

# Backend (not configured yet)
cd backend
npm test
```

**Git**:
```bash
git status
git add .
git commit -m "Descriptive message"
git push -u origin <branch-name>
```

### Key Files to Know

**Backend**:
- `/backend/server.js` - Main entry point
- `/backend/middleware/auth.js` - JWT authentication
- `/backend/models/User.js` - User schema
- `/backend/models/Watchlist.js` - Watchlist schema

**Frontend**:
- `/frontend/src/App.jsx` - Main routing (ACTIVE)
- `/frontend/src/context/AuthContext.js` - Global auth state
- `/frontend/src/utils/api.js` - Backend API client
- `/frontend/src/utils/tmdbApi.js` - TMDB API client

### Common Imports

**Backend**:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
```

**Frontend**:
```javascript
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { tmdbApi } from '../utils/tmdbApi';
```

### HTTP Status Codes Used

- **200** OK - Successful GET, PATCH
- **201** Created - Successful POST (resource created)
- **400** Bad Request - Validation errors, bad input
- **401** Unauthorized - Authentication required or failed
- **404** Not Found - Resource doesn't exist
- **500** Internal Server Error - Server-side error

---

## Deployment Considerations

### Frontend (Vercel)

Currently deployed at: https://next-flick.vercel.app

**Build Configuration**:
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

**Environment Variables** (set in Vercel dashboard):
- `REACT_APP_TMDB_API_KEY`
- `REACT_APP_API_URL` (production backend URL)

### Backend (Not Specified)

Likely deployed to Heroku, Railway, Render, or similar.

**Environment Variables Required**:
- `MONGODB_URI`
- `JWT_SECRET`
- `TMDB_API_KEY`
- `PORT`
- `FRONTEND_URL` (production frontend URL for CORS)

**Deployment Checklist**:
1. Set all environment variables
2. Update CORS origins to include production URL
3. Ensure MongoDB is accessible from deployment server
4. Set NODE_ENV=production
5. Use `npm start` (not `npm run dev`)

---

## Additional Resources

### External Documentation
- **TMDB API**: https://developers.themoviedb.org/3
- **React Router v6**: https://reactrouter.com/docs/en/v6
- **Mongoose**: https://mongoosejs.com/docs/
- **Express**: https://expressjs.com/
- **JWT**: https://jwt.io/introduction
- **React Context**: https://react.dev/reference/react/useContext

### Project Files
- `README.md` - User-facing documentation
- `mermaid.md` - Architecture diagrams
- `.gitignore` - Ignored files and directories

---

## Changelog

### 2025-11-19
- Initial CLAUDE.md creation
- Documented complete codebase structure
- Added comprehensive API reference
- Documented authentication flow
- Listed known issues and best practices

---

## Contact & Support

For questions about this codebase:
1. Check this CLAUDE.md file first
2. Review code comments and README.md
3. Check TMDB API documentation for external API questions
4. Review commit history for context on changes

---

**End of CLAUDE.md**
