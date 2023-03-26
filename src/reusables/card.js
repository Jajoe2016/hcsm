import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
import { Navigate } from 'react-router-dom';


const generateCard = (title, description, buttonString, setcardActionClicked, uuid) => {
  const card = (
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
           {title}
          </Typography>
          <Typography variant="body2" flexWrap={1}>
           {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => {setcardActionClicked(`${uuid}`)} }>{buttonString} </Button>
        </CardActions>
      </React.Fragment>
    );
  return card;
}

export default function OutlinedCard({title, description, buttonString, setcardActionClicked,uuid}) {
  return (
    <ThemeProvider theme={theme}>
     <Card sx={{ minWidth: 50}} variant="elevation">{generateCard(title, description, buttonString, setcardActionClicked, uuid)}</Card>
    </ThemeProvider>
  );
}

OutlinedCard.propTypes = {
  setcardActionClicked: PropTypes.func,
}

