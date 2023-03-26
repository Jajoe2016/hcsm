import React, { useState }from 'react';
import Container from '../../reusables/container';
import DataTable from '../../reusables/table'
import useFetch from '../Helpers/useFetch';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
//ui imports
import theme from '../../reusables/theme';
import OutlinedCard from '../../reusables/card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, ThemeProvider, Stack } from '@mui/material';


const getPatient = async(patientData)=>{
  return fetch('http://localhost:3001/getpatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patientData)
    })
      .then(data => data.json())
  
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstname', headerName: 'First Name', width: 130 },
  { field: 'lastname', headerName: 'Last Name', width: 130 },
  { field: 'dob', headerName: 'Date Of Birth', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  {field: 'mrn', headerName: 'MedicalRecordNo', width: 200 },
];

function ViewPatients() {
  const [cardActionClicked, setcardActionClicked] = useState(false);
  const [statusCode, setStatusCode] = useState();
  
  const [operationcode, setOperationcode] = useState();
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [mrn, setMRN] = useState();

  const {loading,data} = useFetch("http://localhost:3001/getpatients");
  // var topBlock;
  var mainBlock = 
            <Grid container rowSpacing={1} columnSpacing={{ xs: 100, sm: 300, md: 0 }}>
              <Typography variant="subtitle1" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              </Typography>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 100, sm: 300, md: 0 }} >
                <div> { loading ? <CircularProgress/> : <DataTable getRowId={(data) => data.mrn} rows={data} columns={columns} /> }</div>
              </Grid>
            </Grid>

// async function handleSubmit() {
//   const data = await getPatient({ "id": id, "email": email, "phone": phone, "mrn" : mrn});
//   setStatusCode(data.code);
//   topBlock = 
//         <Grid container rowSpacing={1} columnSpacing={{ xs: 100, sm: 300, md: 0 }}>
//           <Typography variant="subtitle1" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
//           <Box sx={{ width: 500, height: 50 }}> Patient Search Result</Box>

//           <Box sx={{ width: 500, height: 50 }}> 
//           Patient ID: data.id
          
//           </Box>

//           </Typography>
//         </Grid>
// }

// if ( operationcode === 1 || cardActionClicked === `ser1`) {
//   return (
//     <Container>       
//       <ThemeProvider theme={theme}>
//     <form onSubmit={handleSubmit}>
//         <FormControl>
//           <TextField name="id" label='patient id' required sx={{mb: 2}} variant='filled' size='small' type='string' color='neutral' onChange={e => setId(e.target.value)}></TextField>
//           <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
//             <TextField name="email" label='Email' required sx={{mb: 1}} variant='filled' size='small' type='email' color='neutral' onChange={e => setEmail(e.target.value)}></TextField>
//             <TextField name="phone" label='Phone' required sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral'onChange={e => setPhone(e.target.value)}></TextField>
//           </Stack>
//           <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
//             <TextField name="mrn" label='Medical Record No' sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral' onChange={e => setMRN(e.target.value)}></TextField>
//           </Stack>
//           <Button variant="contained" sx={{mb: 3}} color='neutral' type="submit">Search Patient</Button>
//         </FormControl>
//     </form>
//     </ThemeProvider>
//     </Container>
//   )
// }


    
  return(
    <Container>      
        <ThemeProvider theme={theme}>
        <Box sx={{ width: 500, height: 50 }}>
        <Grid container spacing={1} rowSpacing={3}></Grid>
        </Box>
        
        <Box sx={{ flexGrow: 1, width: 1000, height: 200}}>
          <Grid container spacing={1} rowSpacing={3}>
          {/* <OutlinedCard setcardActionClicked={setcardActionClicked} title='Search Patient' description='click below to search patient' buttonString='Search patient' uuid='ser1'/> */}
          </Grid>
          </Box>
       
          <Box sx={{ flexGrow: 1, width: 500, height: 50}}>
        <Typography variant="subtitle1" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            { statusCode === 200 ? <div>Operation was succesful! List of all Patients. </div> : <div> List of all Patients.</div>}
        </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, width: 1000}}>{mainBlock}</Box>
      
        </ThemeProvider>
      </Container>
  );
}

export default ViewPatients;