import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Container, Button, Box, Card, CardMedia, CardContent } from '@mui/material';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [movies, setMovies] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
      const options = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`  // Replace with your actual API key
        }
      };

      try {
        const response = await axios.get(url, options);
        setMovies(response.data.results); // Save the movie data to the state
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.username || 'Guest'}!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Trending Movies:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {movies.map((movie: any) => (
          <Card key={movie.id} sx={{ width: 250 }}>
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
            </CardContent>
          </Card>
        ))}
      </Box>
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 4 }}>
        Logout
      </Button>
    </Container>
  );
};

export default Home;
