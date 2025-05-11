import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';

const FiltersSection = ({
  selectedGenre,
  setSelectedGenre,
  selectedYear,
  setSelectedYear,
  selectedRating,
  setSelectedRating,
}: {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedRating: string;
  setSelectedRating: (rating: string) => void;
}) => {
  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedRating('');
  };

  return (
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

        <Button variant="outlined" color="secondary" size="small" onClick={clearFilters}>
          Clear Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default FiltersSection;
