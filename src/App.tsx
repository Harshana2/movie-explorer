import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import { CustomThemeProvider } from './components/ThemeContext'; // ✅ Import ThemeContext

const App = () => {
  return (
    <CustomThemeProvider> {/* ✅ Wrap app with ThemeProvider */}
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
};

export default App;
