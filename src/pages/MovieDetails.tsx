import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/Header'; // Import Header component

const MovieDetails = ({ username, toggleColorMode }: { username: string; toggleColorMode: () => void }) => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );
        setMovie(movieResponse.data);

        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );
        setCast(castResponse.data.cast);

        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );
        if (trailerResponse.data.results.length > 0) {
          setTrailer(trailerResponse.data.results[0].key);
        }
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
    <Container sx={{ marginTop: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/home')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Header username={username} toggleColorMode={toggleColorMode} handleLogout={() => console.log('Logout clicked')} />

      <Card>
      <CardMedia
  component="img"
  height="auto"  // Ensure the height adjusts based on the image's aspect ratio
  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
  alt={movie.title}
  sx={{ objectFit: 'contain', maxHeight: 500 }} // Ensure the image fits without being cropped
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

          {cast.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Cast:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {cast.slice(0, 6).map((actor: any) => (
                  <Box key={actor.id} sx={{ maxWidth: 200 }}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="250"
                        image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        alt={actor.name}
                      />
                      <CardContent>
                        <Typography variant="body2" align="center">
                          {actor.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {trailer && (
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                href={`https://www.youtube.com/watch?v=${trailer}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Trailer
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default MovieDetails;
