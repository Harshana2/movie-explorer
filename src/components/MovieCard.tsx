import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

interface MovieCardProps {
  movie: any;
  onClick: () => void;
  isFavorite: boolean;
  addToFavorites: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  isFavorite,
  addToFavorites
}) => (
  <Card
    sx={{
      width: 250,
      cursor: 'pointer',
      position: 'relative',
      '&:hover .movieOverview': {
        opacity: 1,
      },
    }}
    onClick={onClick}
  >
    <CardMedia
      component="img"
      height="300"
      image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title || movie.name}
      sx={{
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    />
    <Tooltip title={isFavorite ? 'Already in Favorites' : 'Add to Favorites'}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          addToFavorites();
        }}
        sx={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }}
      >
        {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
    <Typography
      variant="body2"
      className="movieOverview"
      sx={{
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        padding: '10px',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 2,
        transition: 'opacity 0.3s ease',
      }}
    >
      {movie.overview}
    </Typography>
    <CardContent>
      <Typography variant="subtitle1">{movie.title || movie.name}</Typography>
      <Typography variant="body2" color="textSecondary">
        {movie.release_date || movie.first_air_date}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        ⭐ {movie.vote_average?.toFixed(1)} / 10
      </Typography>
    </CardContent>
  </Card>
);

export default MovieCard;
