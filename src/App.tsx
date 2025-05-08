// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import Home from './pages/Home'; // Create this later
// import PrivateRoute from './components/PrivateRoute'; // Create this later

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
           
              <Home />
            
          }
        />
      </Routes>
    </Router>
  );
};

export default App;