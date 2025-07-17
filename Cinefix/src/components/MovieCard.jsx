import React from 'react';
import { useMovieContext } from '../contexts/MovieContext.jsx';

function MovieCard({ movie }) {
  const {
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  } = useMovieContext();

  // ✅ Use both ID and poster path for accuracy
  const favorite = isFavorite(movie.id, movie.poster_path);

  const onFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id, movie.poster_path);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster relative">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-48 object-cover rounded"
        />
        <div className="movie-overlay absolute top-2 right-2">
          <button
            onClick={onFavoriteClick}
            className={`favorite-btn text-2xl ${
              favorite ? 'text-red-500' : 'text-white'
            }`}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info text-center mt-2">
        <h3 className="text-md font-bold">{movie.title}</h3>
        <p className="text-sm text-gray-500">
          {movie.release_date?.split('-')[0]}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
