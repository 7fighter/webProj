import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard.jsx';
import { getPopularMovies, searchMovies } from '../services/api.js';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    } catch (error) {
      setError('Failed to load movies...');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;
    if (isLoading) return;

    try {
      setLoading(true);
      setError(null);
      const results = await searchMovies(searchQuery);
      setMovies(results);
    } catch (error) {
      setError('Failed to search movies...');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search for mock movies..."
          className="flex-1 p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {isError && <div className="text-red-500 mb-4">{isError}</div>}

      {isLoading ? (
        <div className="text-center text-lg text-gray-700">Loading...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
