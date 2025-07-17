// Return movies with random images on each call
export const getPopularMovies = async () => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Sample Movie ${i + 1}`,
    release_date: `202${i % 10}-01-01`,
    poster_path: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`
  }));
};

export const searchMovies = async (query) => {
  return Array.from({ length: 6 }, (_, i) => ({
    id: i + 101,
    title: `${query} Result ${i + 1}`,
    release_date: `202${i % 5}-01-01`,
    poster_path: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`
  }));
};
