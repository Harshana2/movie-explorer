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
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import LoadMoreButton from '../components/LoadMoreButton';
import FiltersSection from '../components/FilterSection';

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
  const navigate = useNavigate();

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
    window.location.href = '/';
  };

  const handleMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`, { state: { username } });
  };

  useEffect(() => {
    fetchAllMovies();
  }, [selectedGenre, selectedYear, selectedRating]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Header username={username} toggleColorMode={toggleColorMode} handleLogout={handleLogout} />
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
      <FiltersSection
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />
      <MovieGrid
        movies={movies}
        onMovieClick={handleMovieClick} 
        addToFavorites={addToFavorites}
        checkFavorite={checkFavorite}
      />
      <LoadMoreButton loading={loading} hasMore={hasMore} onLoadMore={fetchMoreMovies} />
    </Container>
  );
};

export default Home;
