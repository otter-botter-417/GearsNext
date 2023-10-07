import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#607d8b',
      contrastText: '#dedee0',
    },
    secondary: {
      main: '#e2e2e2',
      contrastText: '#dfe4e4',
    },
    text: {
      secondary: '#616161',
      disabled: '#616161',
      primary: '#616161',
    },
    error: {
      main: '#b33d3d',
    },
    warning: {
      main: '#ed6c02',
    },
    success: {
      main: '#2e7d32',
      contrastText: '#ff1744',
    },
  },
  typography: {
    fontFamily: '"Roboto"',
  },
};
