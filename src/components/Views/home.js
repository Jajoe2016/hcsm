import React from 'react';
import Container from '../../reusables/container';
import Box from '@mui/material/Box';
import DataTable from '../../reusables/table'
import useFetch from '../Helpers/useFetch';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material';
import theme from '../../reusables/theme';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'User Name', width: 130 },
  { field: 'datetime', headerName: 'Appointment time', width: 300 },
  { field: 'doctor', headerName: 'Doctor', width: 300 }
];

export default function Home() {
  const userFromLocalStore =  sessionStorage.getItem('userFromLocalStore');
  const {loading,data} = useFetch("http://localhost:3001/gettodayappts");
  var mainBlock = 
  <ThemeProvider theme={theme}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 100, sm: 300, md: 0 }}>
              <Typography variant="subtitle1" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
        <div> Today's Appointments. Go to <Link underline="hover" color="primary" href="/manageappointments">Manage Appointments </Link> 
         to manage appointments </div>
        <Box sx={{ width: 500, height: 50 }}>
        <Grid container spacing={1} rowSpacing={3}></Grid>
        </Box>
        </Typography>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 100, sm: 300, md: 0 }}>
                <div> { loading ? <CircularProgress/> : <DataTable rows={data} columns={columns}/> }</div>
              </Grid>
            </Grid>
      </ThemeProvider>


    return (       
      <React.Fragment>
         <ThemeProvider theme={theme}>
        <Container>
        <Typography variant="subtitle1" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
        Welcome! {userFromLocalStore} This is your HOME page.
        </Typography>         
         <Box sx={{ flexGrow: 1, width: 1000}}>{mainBlock}</Box>
        </Container>
        </ThemeProvider>
        </React.Fragment>
        )
}
