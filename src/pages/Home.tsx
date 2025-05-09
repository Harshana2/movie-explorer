import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
  const [view, setView] = useState('all'); // New state to manage the view
  const theme = useTheme();

  // Fetch All Movies
  const fetchAllMovies = async () => {
    try {
      setLoading(true);
      setIsSearching(false);

      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`, // Using Bearer token from .env
          'accept': 'application/json',
        },
        params: {
          include_adult: false,
          include_video: false,
          language: 'en-US',
          page: 1,
          sort_by: 'popularity.desc',
        },
      });

      setMovies(response.data.results); // Set the movie data to the state
      setPage(2);  // Start the page from 2 for future requests
      setHasMore(response.data.results.length > 0); // Check if more movies are available
    } catch (error) {
      console.error('Failed to fetch all movies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Trending Movies
  const fetchTrendingMovies = async () => {
    try {
      setLoading(true);
      setIsSearching(false);

      const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
          'accept': 'application/json',
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

  // Fetch More Movies
  const fetchMoreMovies = async () => {
    if (loading || !hasMore) return; // Prevent fetch if already loading or no more movies to fetch

    try {
      setLoading(true);
      
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
          'accept': 'application/json',
        },
        params: {
          include_adult: false,
          include_video: false,
          language: 'en-US',
          page,
          sort_by: 'popularity.desc',
        },
      });

      setMovies((prevMovies) => [...prevMovies, ...response.data.results]); // Append new movies
      setPage((prevPage) => prevPage + 1);  // Increment the page for the next fetch
      setHasMore(response.data.results.length > 0); // Update if more movies are available
    } catch (error) {
      console.error('Failed to fetch more movies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Movie Click
  const handleMovieClick = (movie: any) => {
    console.log('Selected movie:', movie);
    // Optionally navigate to details page
  };

  // Handle Search
  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      setLoading(true);
      setIsSearching(true);
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
          'accept': 'application/json',
        },
        params: {
          include_adult: false,
          language: 'en-US',
          page: 1,
          query: searchQuery,
        },
      });
      setMovies(response.data.results); // Set the search result
      setPage(2);
      setHasMore(response.data.results.length > 0);
    } catch (error) {
      console.error('Failed to search movies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show Favorites
  const showFavorites = () => {
    setMovies(favorites);
    setIsSearching(false);
    setHasMore(false);
  };

  // Add Movie to Favorites
  const addToFavorites = (movie: any) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isAlreadyFavorite) {
      // If the movie is already in favorites, remove it
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      // If the movie is not in favorites, add it
      setFavorites((prev) => [...prev, movie]);
    }
  };

  // Check if Movie is in Favorites
  const checkFavorite = (movie: any) => favorites.some((fav) => fav.id === movie.id);

  // Clear Search
  const clearSearch = () => {
    setSearchQuery('');
    setView('all');
  };

  // Fetch movies when logged in
  useEffect(() => {
    if (username) {
      fetchAllMovies();
    }
  }, [username]);

  return (
    <Container sx={{ py: 4 }}>
      <Header username={username} toggleColorMode={toggleColorMode} />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        fetchTrendingMovies={fetchTrendingMovies}
        showFavorites={showFavorites}
        discoverAllMovies={fetchAllMovies} // Pass the discover all movies function
        isSearching={isSearching}
        clearSearch={clearSearch}
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
