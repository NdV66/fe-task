import { PaletteOptions } from '@mui/material';

export type TAppTheme = {
  name: PaletteOptions['mode'];
  primary: string;
  secondary: string;
  light: string;
  background: string;
  fontSize: number;
};
