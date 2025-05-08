import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Paper
} from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    // Save user login data to local storage (simple simulation)
    localStorage.setItem('user', JSON.stringify({ username }));
    navigate('/home');
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Movie Explorer Login
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;