import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from '@mui/material';

const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return <Typography variant="h6">Movie not found.</Typography>;
  }

  return (
    <Container sx={{ marginTop: 8 }}>
      <Card>
        <CardMedia
          component="img"
          height="500"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {movie.overview}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Genres: {movie.genres?.map((g: any) => g.name).join(', ')}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Release Date: {movie.release_date}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Rating: ⭐ {movie.vote_average?.toFixed(1)} / 10
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MovieDetails;
