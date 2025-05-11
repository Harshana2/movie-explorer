import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';

interface LoadMoreButtonProps {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const LoadMoreButton = ({ loading, hasMore, onLoadMore }: LoadMoreButtonProps) => {
  return (
    <>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <Button variant="contained" onClick={onLoadMore}>
            Load More
          </Button>
        </Box>
      )}
    </>
  );
};

export default LoadMoreButton;
