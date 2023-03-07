import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import theme from '../../reusables/theme';
import { ThemeProvider } from '@mui/material';


const generateCard = (title, description, buttonString, ) => {
    const card = (
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
             {title}
            </Typography>
            <Typography variant="body2">
             {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">{buttonString}</Button>
          </CardActions>
        </React.Fragment>
      );
    return card;
}

export default function OutlinedCard() {
  return (
    <ThemeProvider theme={theme}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
     <Grid><Card sx={{ minWidth: 300}} variant="elevation">{generateCard('Add New Patient', 'This will help you add new patient', 'Click to Add Patient')}</Card></Grid>  
     <Grid><Card sx={{ minWidth: 300}} variant="outlined">{generateCard('Open Patient', 'This will help follow up existing patient', 'Click to Search')}</Card></Grid>
    </Grid>
    </ThemeProvider>
  );
}