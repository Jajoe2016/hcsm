import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#099f87',
      darker: '#005533',
    },
    neutral: {
      main: '#deb887',
      darker: '#ce954b',
      contrastText: '#000000',
    },
  },
});


export default theme;