import { Box, CircularProgress } from '@mui/material';

export const NoData = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', margin: '64px 0' }}>
    <CircularProgress />
  </Box>
);
