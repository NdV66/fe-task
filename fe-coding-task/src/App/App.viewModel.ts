import { createTheme, PaletteOptions } from '@mui/material';
import { TAppTheme } from './App.types';

export const useMuiTheme = (theme: TAppTheme) => {
  const palette: PaletteOptions = {
    mode: theme.name,
    primary: {
      main: theme.primary,
      contrastText: theme.background,
    },
    secondary: {
      main: theme.secondary,
      contrastText: theme.light,
    },
    background: {
      default: theme.background,
    },
  };

  const muiTheme = createTheme({
    typography: {
      fontSize: theme.fontSize,
    },
    palette,
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            background: theme.primary,
            color: theme.background,
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            background: theme.background,
            color: theme.primary,
            padding: '0 32px',
            boxShadow: 'none',
            textTransform: 'uppercase',
          },
        },
      },
    },
  });

  return muiTheme;
};
