### **Project Setup and Initialisation**

1.  **Install Node.js**: This is the first requirement to work with React and use `npm` (Node Package Manager). Ensure it's added to your system path.
2.  **Create React Project using Vite**:
    *   Open your terminal in the desired directory (e.g., your desktop).
    *   Run the command:
        ```bash
        npm create vite@latest
        ```
    *   When prompted:
        *   **Project name:** `frontend` (or your preferred name)
        *   **Framework:** **`react`**
        *   **Variant:** **`javascript`**
3.  **Navigate into the Project Directory**:
    ```bash
    cd frontend
    ```
4.  **Install Dependencies**: This command reads `package.json` and installs the required packages (like React itself).
    ```bash
    npm install
    ```
5.  **Install React Router DOM**: This is a separate package needed for navigation between pages.
    ```bash
    npm install react-router-dom
    ```
6.  **Run the Development Server**: This will start your React application, typically on `http://localhost:5173/`.
    ```bash
    npm run dev
    ```
    *   The server will feature **hot reload**, meaning changes saved to your code will automatically update in the browser without manual refreshing.

---

### **Core File Structure (Implied from creation steps)**

The project will initially create standard Vite/React files. You will then create new folders as components are developed.

*   `frontend/`
    *   `node_modules/`
    *   `public/` (for icons/logos)
    *   `src/`
        *   `assets/` (implied, often for SVG/images)
        *   `components/` (new folder for `MovieCard.jsx`, `Navbar.jsx`)
        *   `context/` (new folder for `MovieContext.jsx`)
        *   `css/` (new folder for downloaded CSS files)
        *   `pages/` (new folder for `Home.jsx`, `Favorites.jsx`)
        *   `services/` (new folder for `api.js`)
        *   `App.jsx`
        *   `main.jsx`
        *   `index.css` (will be moved/replaced)
        *   `App.css` (will be moved/replaced)
    *   `index.html`
    *   `package.json`
    *   `package-lock.json`
    *   `README.md`
    *   `vite.config.js` (or similar for Vite configuration)

---

### **Reconstructed Code Logic for Key Files**

#### **1. `index.html` (Located in the root `frontend/` directory)**

This file serves as the entry point where React injects its application.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Movie List</title> <!-- Changed title from default -->
  </head>
  <body>
    <div id="root"></div> <!-- React code gets injected here -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### **2. `src/main.jsx`**

This is the starting point of the React application, responsible for rendering the main `App` component into the `root` div in `index.html`. It also sets up the `BrowserRouter` and `MovieProvider` contexts.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './css/index.css'; // Updated CSS import path
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { MovieProvider } from './context/MovieContext.jsx'; // Import MovieProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap App with BrowserRouter for routing */}
      <MovieProvider> {/* Wrap App with MovieProvider for global state */}
        <App />
      </MovieProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
```

#### **3. `src/App.jsx`**

This is the main application component, acting as the root for routing and holding the `Navbar`.

```jsx
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route for routing
import Home from './pages/Home.jsx'; // Import Home page component
import Favorites from './pages/Favorites.jsx'; // Import Favorites page component
import Navbar from './components/Navbar.jsx'; // Import Navbar component
import './css/App.css'; // Updated CSS import path

function App() {
  // Cleared out initial template code
  return (
    <div> {/* Parent div to wrap Navbar and main content */}
      <Navbar /> {/* Render Navbar component */}
      <main className="main-content"> {/* Main content area with class name */}
        <Routes> {/* Define application routes */}
          <Route path="/" element={<Home />} /> {/* Default path for Home page */}
          <Route path="/favorites" element={<Favorites />} /> {/* Path for Favorites page */}
        </Routes>
      </main>
    </div>
  );
}

export default App; // Export App component
```

#### **4. `src/components/MovieCard.jsx`**

This component displays information about a single movie and handles the favourite logic.

```jsx
import React from 'react';
import { useMovieContext } from '../context/MovieContext.jsx'; // Import useMovieContext for global state
import '../css/MovieCard.css'; // Import MovieCard specific CSS

function MovieCard({ movie }) { // Accepts 'movie' object as a prop
  // Access state and functions from MovieContext
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id); // Check if the current movie is a favorite

  // Event handler for favorite button click
  const onFavoriteClick = (e) => {
    e.preventDefault(); // Prevent default button behavior (e.g., form submission)
    if (favorite) {
      removeFromFavorites(movie.id); // If already favorite, remove it
    } else {
      addToFavorites(movie); // Otherwise, add it to favorites
    }
  };

  return (
    <div className="movie-card"> {/* Root element for the movie card */}
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Dynamically set image source
          alt={movie.title} // Set alt text to movie title
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? 'active' : ''}`} // Conditionally add 'active' class
            onClick={onFavoriteClick} // Attach click event handler
          >
            &#x2764; {/* Heart icon */}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3> {/* Display movie title from prop */}
        <p>{movie.release_date?.split('-')}</p> {/* Display movie release year from prop */}
      </div>
    </div>
  );
}

export default MovieCard; // Export MovieCard as default
```

#### **5. `src/components/Navbar.jsx`**

This component provides navigation links for the application.

```jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import '../css/Navbar.css'; // Import Navbar specific CSS

function Navbar() {
  return (
    <nav className="navbar"> {/* Navigation element */}
      <div className="navbar-brand">
        <Link to="/">Movie App</Link> {/* Link to home page */}
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link> {/* Link to Home */}
        <Link to="/favorites" className="nav-link">Favorites</Link> {/* Link to Favorites */}
      </div>
    </nav>
  );
}

export default Navbar; // Export Navbar as default
```

#### **6. `src/pages/Home.jsx`**

This component displays popular movies, allows searching, and manages local loading/error states.

```jsx
import React, { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import MovieCard from '../components/MovieCard.jsx'; // Import MovieCard component
import { getPopularMovies, searchMovies } from '../services/api.js'; // Import API functions
import '../css/Home.css'; // Import Home page specific CSS

function Home() {
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [movies, setMovies] = useState([]); // State for list of movies to display
  const [isLoading, setLoading] = useState(true); // State for loading status
  const [isError, setError] = useState(null); // State for error messages

  // Function to load popular movies
  const loadPopularMovies = async () => {
    try {
      setLoading(true); // Set loading to true before API call
      setError(null); // Clear any previous errors
      const popularMovies = await getPopularMovies(); // Fetch popular movies
      setMovies(popularMovies); // Update movies state
    } catch (error) {
      setError('Failed to load movies...'); // Set error state on failure
      console.log(error); // Log error for debugging
    } finally {
      setLoading(false); // Set loading to false regardless of success/failure
    }
  };

  // Function to handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page refresh)

    if (searchQuery.trim() === '') { // Validate search query (not empty or just spaces)
      return;
    }
    if (isLoading) { // Prevent searching if already loading
        return;
    }

    try {
      setLoading(true); // Set loading to true
      setError(null); // Clear any previous errors
      const searchResults = await searchMovies(searchQuery); // Call search API
      setMovies(searchResults); // Update movies state with search results
    } catch (error) {
      setError('Failed to search movies...'); // Set error state on failure
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // useEffect to load popular movies only once on component mount
  useEffect(() => {
    loadPopularMovies();
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form"> {/* Search form */}
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery} // Bind input value to searchQuery state
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on change
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {isError && ( // Conditionally render error message if error exists
        <div className="error-message">{isError}</div>
      )}

      {isLoading ? ( // Conditionally render loading message if loading
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid"> {/* Grid to display movies */}
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} /> // Map over movies to render MovieCard for each
          ))}
        </div>
      )}
    </div>
  );
}

export default Home; // Export Home component
```

#### **7. `src/pages/Favorites.jsx`**

This component displays the list of favorite movies.

```jsx
import React from 'react';
import { useMovieContext } from '../context/MovieContext.jsx'; // Import useMovieContext for favorites state
import MovieCard from '../components/MovieCard.jsx'; // Import MovieCard to display favorites
import '../css/Favorites.css'; // Import Favorites page specific CSS

function Favorites() {
  const { favorites } = useMovieContext(); // Get favorites array from context

  return (
    <div className="favorites-page"> {/* Wrapper div for the favorites page */}
      <h2>Your Favorites</h2> {/* Section header */}
      {favorites.length > 0 ? ( // Conditionally render based on if there are favorite movies
        <div className="movies-grid"> {/* Reuse movie grid class for consistent styling */}
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} /> // Map over favorites to display MovieCard
          ))}
        </div>
      ) : (
        <div className="favorites-empty"> {/* Message for no favorite movies */}
          <h2>No favorite movies yet</h2>
          <p>Start adding movies to your favorites and they will appear here</p>
        </div>
      )}
    </div>
  );
}

export default Favorites; // Export Favorites component
```

#### **8. `src/services/api.js`**

This file contains functions for interacting with The Movie Database API.

```javascript
// Define API Key and Base URL (replace with your actual API key)
const API_KEY = 'YOUR_API_KEY_HERE'; // Get this from The Movie Database website
const BASE_URL = 'https://api.themoviedb.org/3'; // Base URL for the API

// Function to fetch popular movies
export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`); // Fetch request to popular movies endpoint
    const data = await response.json(); // Parse response as JSON
    return data.results; // Return the array of movie results
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Function to search for movies
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}` // Fetch request to search endpoint with encoded query
    );
    const data = await response.json(); // Parse response as JSON
    return data.results; // Return the array of search results
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};
```

#### **9. `src/context/MovieContext.jsx`**

This file sets up a React Context to manage and provide global state (favorites) and related functions to the entire application.

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react'; // Import necessary React hooks and createContext

// Create the Movie Context
const MovieContext = createContext();

// Custom hook to easily consume the Movie Context
export const useMovieContext = () => {
  return useContext(MovieContext);
};

// MovieProvider component to wrap the application and provide state
export const MovieProvider = ({ children }) => { // Accepts 'children' prop
  const [favorites, setFavorites] = useState([]); // State to store favorite movies

  // useEffect to load favorites from local storage on initial mount
  useEffect(() => {
    const storedFaves = localStorage.getItem('favorites'); // Get 'favorites' item from local storage
    if (storedFaves) {
      setFavorites(JSON.parse(storedFaves)); // Parse JSON string back to array and set state
    }
  }, []); // Empty dependency array: runs only once on mount

  // useEffect to save favorites to local storage whenever 'favorites' state changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Stringify array to JSON and save to local storage
  }, [favorites]); // Dependency array: runs whenever 'favorites' array changes

  // Function to add a movie to favorites
  const addToFavorites = (movie) => {
    // Immutable update: create a new array with previous favorites and the new movie
    setFavorites((prev) => [...prev, movie]);
  };

  // Function to remove a movie from favorites
  const removeFromFavorites = (movieId) => {
    // Immutable update: filter out the movie with the matching ID
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  // Function to check if a movie is a favorite
  const isFavorite = (movieId) => {
    // Use .some() to check if any favorite movie matches the ID
    return favorites.some((movie) => movie.id === movieId);
  };

  // Object containing all values to be provided by the context
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}> {/* Provider makes 'value' accessible to children */}
      {children} {/* Renders all child components wrapped by the provider */}
    </MovieContext.Provider>
  );
};
```

---
---









