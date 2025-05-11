import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import { CustomThemeProvider, useThemeContext } from './components/ThemeContext';

const AppContent = () => {
  const [username, setUsername] = useState('Guest');
  const { toggleColorMode } = useThemeContext();

  return (
    <Routes>
      <Route path="/" element={<Login setUsername={setUsername} />} />
      <Route
        path="/home"
        element={<Home username={username} toggleColorMode={toggleColorMode} />}
      />
      <Route
        path="/movie/:movieId"
        element={<MovieDetails username={username} toggleColorMode={toggleColorMode} />}
      />
    </Routes>
  );
};

const App = () => {
  return (
    <CustomThemeProvider>
      <Router>
        <CssBaseline />
        <AppContent />
      </Router>
    </CustomThemeProvider>
  );
};

export default App;
