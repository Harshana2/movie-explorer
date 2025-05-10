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
import { styled } from '@mui/system';

interface LoginProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

// Styled components
const LoginContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  maxWidth: 400,
  width: '100%',
  borderRadius: 16,
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: 10,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 12,
  fontWeight: 600,
  fontSize: '1rem',
  marginTop: theme.spacing(2),
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(1),
}));

const Login: React.FC<LoginProps> = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!usernameInput || !password) {
      setError('Username and password are required.');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ username: usernameInput }));
    setUsername(usernameInput);
    navigate('/home');
  };

  return (
    <LoginContainer maxWidth="sm">
      <LoginPaper elevation={4}>
        <Typography variant="h4" align="center" gutterBottom>
          🎬 Movie Explorer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
          Login to discover and save your favorite films
        </Typography>
        <Box mt={3} display="flex" flexDirection="column" gap={2}>
          <StyledTextField
            label="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <StyledTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <StyledButton variant="contained" color="primary" onClick={handleLogin} fullWidth>
            Login
          </StyledButton>
        </Box>
      </LoginPaper>
    </LoginContainer>
  );
};

export default Login;
