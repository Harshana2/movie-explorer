// pages/Home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Container,
  Button,
  Card,
  CardMedia,
  CardContent,
  Box,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleMovieClick = (movie: any) => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  const fetchMovies = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/discover/movie',
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
          },
          params: {
            sort_by: 'popularity.desc',
            page: pageNumber
          }
        }
      );
      const newMovies = response.data.results;
      setMovies((prev) => [...prev, ...newMovies]);
      if (newMovies.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch movies', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.username || 'Guest'}!
      </Typography>
      <Typography variant="body1" gutterBottom>
        All Movies:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {movies.map((movie: any) => (
          <Card
            key={movie.id}
            sx={{ width: 250, cursor: 'pointer' }}
            onClick={() => handleMovieClick(movie)}
          >
            <CardMedia
              component="img"
              height="300"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
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
        ))}
      </Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 4 }}>
        Logout
      </Button>
    </Container>
  );
};

export default Home;
