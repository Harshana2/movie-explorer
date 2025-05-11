import React from 'react';
import {
  Typography,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Header = ({
  username,
  toggleColorMode,
  handleLogout,
}: {
  username: string;
  toggleColorMode: () => void;
  handleLogout: () => void;
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Welcome, {username || 'Guest'}!
      </Typography>

      <Box display="flex" alignItems="center" gap={2}>
        <IconButton onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        <Button
          variant="contained"
          color="error"
          size="medium"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
