import React from 'react';
import { Box } from '@mui/material';
import MovieCard from './MovieCard';

const MovieGrid = ({
  movies,
  onMovieClick,
  addToFavorites,
  checkFavorite
}: {
  movies: any[];
  onMovieClick: (movie: any) => void;
  addToFavorites: (movie: any) => void;
  checkFavorite: (movie: any) => boolean;
}) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
    {movies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        onClick={() => onMovieClick(movie)}
        isFavorite={checkFavorite(movie)}
        addToFavorites={() => addToFavorites(movie)}
      />
    ))}
  </Box>
);

export default MovieGrid;
