import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom';
export default function FooterBar() {  
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar style={{position: 'static', backgroundColor:'#525252'}}>
            <div>Copyright-2023</div>
            <ul>
              <li>
                <Link to="/"> HOME </Link>
              </li>
              <li>
                <Link to="/account"> HOME </Link>
              </li>
            </ul>
          </Toolbar>
        </Box>
      </ThemeProvider>
    );
  }