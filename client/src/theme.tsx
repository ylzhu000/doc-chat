import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#67a0e3',
      main: '#3b5998',
      dark: '#2a4480',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffbf80',
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
