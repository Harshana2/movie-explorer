import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import LoadMoreButton from '../components/LoadMoreButton';

const Home = ({ username, toggleColorMode }: { username: string; toggleColorMode: () => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const theme = useTheme();

  const fetchAllMovies = async () => {
    try {
      setLoading(true);
      setIsSearching(false);

      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
          accept: 'application/json',
        },
        params: {
          include_adult: false,
          include_video: false,
          language: 'en-US',
          page: 1,
          sort_by: 'popularity.desc',
          with_genres: selectedGenre || undefined,
          primary_release_year: selectedYear || undefined,
          'vote_average.gte': selectedRating || undefined,
        },
      });

      setMovies(response.data.results);
      setPage(2);
      setHasMore(response.data.results.length > 0);
    } catch (error) {
      console.error('Failed to fetch all movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      setLoading(true);
      setIsSearching(false);

      const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
          accept: 'application/json',
        },
      });

      setMovies(response.data.results);
      setPage(2);
      setHasMore(response.data.results.length > 0);
    } catch (error) {
      console.error('Failed to fetch trending movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreMovies = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
          accept: 'application/json',
        },
        params: {
          include_adult: false,
          include_video: false,
          language: 'en-US',
          page,
          sort_by: 'popularity.desc',
          with_genres: selectedGenre || undefined,
          primary_release_year: selectedYear || undefined,
          'vote_average.gte': selectedRating || undefined,
        },
      });

      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(response.data.results.length > 0);
    } catch (error) {
      console.error('Failed to fetch more movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      setLoading(true);
      setIsSearching(true);
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
          accept: 'application/json',
        },
        params: {
          include_adult: false,
          language: 'en-US',
          page: 1,
          query: searchQuery,
        },
      });
      setMovies(response.data.results);
      setPage(2);
      setHasMore(response.data.results.length > 0);
    } catch (error) {
      console.error('Failed to search movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const showFavorites = () => {
    setMovies(favorites);
    setIsSearching(false);
    setHasMore(false);
  };

  const addToFavorites = (movie: any) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites((prev) => [...prev, movie]);
    }
  };

  const checkFavorite = (movie: any) => favorites.some((fav) => fav.id === movie.id);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleLogout = () => {
    window.location.href = '/'; // or implement proper logout logic
  };

  useEffect(() => {
    fetchAllMovies();
  }, [selectedGenre, selectedYear, selectedRating]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Top bar with Logout */}
      

      {/* Header */}
      <Header
  username={username}
  toggleColorMode={toggleColorMode}
  handleLogout={handleLogout}
/>


      {/* Search and quick filters */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        fetchTrendingMovies={fetchTrendingMovies}
        showFavorites={showFavorites}
        discoverAllMovies={fetchAllMovies}
        isSearching={isSearching}
        clearSearch={clearSearch}
      />

      {/* Filter section in Paper */}
      <Paper elevation={2} sx={{ p: 2, my: 3 }}>
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Genre</InputLabel>
            <Select value={selectedGenre} label="Genre" onChange={(e) => setSelectedGenre(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="28">Action</MenuItem>
              <MenuItem value="35">Comedy</MenuItem>
              <MenuItem value="18">Drama</MenuItem>
              <MenuItem value="27">Horror</MenuItem>
              <MenuItem value="10749">Romance</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Year</InputLabel>
            <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {Array.from({ length: 25 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return <MenuItem key={year} value={year}>{year}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Rating</InputLabel>
            <Select value={selectedRating} label="Rating" onChange={(e) => setSelectedRating(e.target.value)}>
              <MenuItem value="">All Ratings</MenuItem>
              <MenuItem value="9">9+</MenuItem>
              <MenuItem value="8">8+</MenuItem>
              <MenuItem value="7">7+</MenuItem>
              <MenuItem value="6">6+</MenuItem>
              <MenuItem value="5">5+</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => {
              setSelectedGenre('');
              setSelectedYear('');
              setSelectedRating('');
            }}
          >
            Clear Filters
          </Button>
        </Box>
      </Paper>

      {/* Movies */}
      <MovieGrid
        movies={movies}
        onMovieClick={() => {}}
        addToFavorites={addToFavorites}
        checkFavorite={checkFavorite}
      />

      {/* Load more */}
      <LoadMoreButton loading={loading} hasMore={hasMore} onLoadMore={fetchMoreMovies} />
    </Container>
  );
};

export default Home;
