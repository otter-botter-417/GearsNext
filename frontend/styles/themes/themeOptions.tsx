import { createTheme } from '@mui/material/styles';

const themeOptions = createTheme(
  {
    typography: {
      fontFamily: 'Helvetica',
    },
    palette: {
      primary: {
        main: '#607d8b',
        contrastText: '#d6dade',
      },
      secondary: {
        main: '#37474f',
        contrastText: '#dfe4e4',
      },
      text: {
        secondary: '#616161',
        disabled: '#616161',
        primary: '#4a4343',
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
  },
  {
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: '#4a4343',
          },
        },
      },
    },
  },
);

export default themeOptions;
