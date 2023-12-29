import { AppBar, Typography, Box, Toolbar, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '../appStore/store';

export const AppTemplate = () => {
  const { translations } = useSelector((state: RootState) => state.languages);

  return (
    <>
      <header role="heading" aria-level={0}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
                {translations.appName}
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </header>

      <main role="main">
        <Container maxWidth="md" sx={{ paddingTop: '40px' }}>
          <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '32px' }}>
            {translations.appName}
          </Typography>
          <Outlet />
        </Container>
      </main>
    </>
  );
};
