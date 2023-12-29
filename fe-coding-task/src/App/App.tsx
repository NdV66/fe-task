import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMuiTheme } from './App.viewModel';
import { PATHS } from '../data';
import { DARK_THEME } from './App.theme';
import { AppTemplate } from '../components';
import { Dashboard } from './Dashboard';

export const App = () => {
  const muiTheme = useMuiTheme(DARK_THEME);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <Router>
        <Routes>
          <Route path={PATHS.MAIN} element={<AppTemplate />}>
            <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
            <Route path="/" element={<Navigate replace to={PATHS.DASHBOARD} />} />
            <Route path="*" element={<div>404</div>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
