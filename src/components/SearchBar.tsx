import React from 'react';
import { Box, Button, TextField } from '@mui/material';

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearch: () => void;
  fetchTrendingMovies: () => void;
  showFavorites: () => void;
  discoverAllMovies: () => void; 
  isSearching: boolean;
  clearSearch: () => void;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  fetchTrendingMovies,
  showFavorites,
  discoverAllMovies, 
  isSearching,
  clearSearch
}: Props) => (
  <>
    <TextField
      label="Search Movies"
      variant="outlined"
      fullWidth
      sx={{ mb: 2 }}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
    />
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <Button variant="outlined" onClick={discoverAllMovies}>Discover All Movies</Button>
      <Button variant="outlined" onClick={fetchTrendingMovies}>Trending</Button>
      <Button variant="outlined" onClick={showFavorites}>My Favorites</Button>
      <Button variant="outlined" onClick={handleSearch}>Search</Button>
      {isSearching && (
        <Button variant="outlined" onClick={clearSearch}>Clear</Button>
      )}
    </Box>
  </>
);

export default SearchBar;
