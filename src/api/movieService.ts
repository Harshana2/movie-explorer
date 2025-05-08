// src/api/movieService.ts
import tmdb from './tmdb';

export const getTrendingMovies = async () => {
  const res = await tmdb.get('/trending/movie/week');
  return res.data.results;
};