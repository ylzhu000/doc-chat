import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#6784b8',
      main: '#1b17f5',
      dark: '#030080',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff9e5a',
      main: '#ff5722',
      dark: '#c41c00',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
    htmlFontSize: 10,
  },
});
