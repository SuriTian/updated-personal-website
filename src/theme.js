import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#1f403d',
      default: '#15312f',
    },
    text: {
      primary: '#ede6d6',
      secondary: '#a9b3aa',
    },
  },
  typography: {
    fontFamily: '"Ubuntu", sans-serif',
  },
});

export default theme;
