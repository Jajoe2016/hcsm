import React from 'react';
import Typography from '@mui/material/Typography';
//ui imports
import { ThemeProvider} from '@mui/material';
import theme from './theme';


function Patient(data) {
  
  return(     
        <ThemeProvider theme={theme}>
        <Typography variant="subtitle1" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
        <div> Patient ID: {data[0].id} </div>
        <div> Patient Username: {data[0].username}</div>
        <div> Patient Email: {data[0].email}</div>
        </Typography>
        </ThemeProvider>
  );
}

export default Patient;