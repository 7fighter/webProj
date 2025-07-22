import React, { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // ✅ Add movie only if same id + poster_path is not already in favorites
  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (fav) => fav.id === movie.id && fav.poster_path === movie.poster_path
      );
      if (!exists) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFromFavorites = (movieId, posterPath) => {
    setFavorites((prev) =>
      prev.filter(
        (movie) =>
          !(movie.id === movieId && movie.poster_path === posterPath)
      )
    );
  };

  // ✅ Check for both id and poster_path
  const isFavorite = (movieId, posterPath) => {
    return favorites.some(
      (movie) =>
        movie.id === movieId && movie.poster_path === posterPath
    );
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
