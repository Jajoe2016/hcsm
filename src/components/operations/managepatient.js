import React, { useState }from 'react';
import Container from '../../reusables/container';
import OutlinedCard from './card';
import DataTable from '../../reusables/table'
import useFetch from '../Helpers/useFetch';


//ui imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, ThemeProvider, Stack } from '@mui/material';
import theme from '../../reusables/theme';

const createUser = async(userData)=>{
  return fetch('http://localhost:3001/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(data => data.json())
  
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'User Name', width: 130 },
  { field: 'type', headerName: 'Account Type', width: 130 },
  { field: 'email', headerName: 'Email', width: 400 }
];


function ManagePatient() {
  const [id, setId] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [accountType, setAccountType] = useState();
  const [operationcode, setOperationcode] = useState();
  const [statusCode, setStatusCode] = useState();

  async function handleSubmit() {
    const data = await createUser({ "id": id, "username" : username, "password" : password, "email": email, "type" : accountType });
    setStatusCode(data.code);
  }
  
  async function handleButton() {
  setOperationcode(1);
  }

  const {loading,data} = useFetch("http://localhost:3001/getusers");

  if ( operationcode == 1) {
    return (
      <Container>       
        <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField name="id" label='user id' required sx={{mb: 2}} variant='filled' size='small' type='string' color='neutral' onChange={e => setId(e.target.value)}></TextField>
            <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
              <TextField name="name" label='username' required sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral' onChange={e => setUserName(e.target.value)}></TextField>
              <TextField name="password" label='password' required sx={{mb: 1}} variant='filled' size='small' type='password' color='neutral' onChange={e => setPassword(e.target.value)}></TextField>
            </Stack>
            <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
              <TextField name="email" label='email' required sx={{mb: 1}} variant='filled' size='small' type='email' color='neutral' onChange={e => setEmail(e.target.value)}></TextField>
              <TextField name="accountType" label='account type' required sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral'onChange={e => setAccountType(e.target.value)}></TextField>
            </Stack>
            <TextField name="dob" label="Date of Birth" required sx={{mb: 1}} variant='outlined' size='medium' type="date" color='neutral' />
            <Button variant="contained" sx={{mb: 3}} color='neutral' type="submit">Create Patient</Button>
          </FormControl>
      </form>
      </ThemeProvider>
      </Container>
    )
  }

  if ( statusCode == 200) {
    return (
      <React.Fragment>
    <Container>
    <div>
    <p> Your Patient Mangement page. Click on buttons below.</p>
    <form onClick={handleButton}>
    <Button variant="contained" sx={{mb: 3}} color='neutral' type="submit">Add New Patient</Button>
    <Button variant="contained" sx={{mb: 3}} color='neutral' type="submit">Remove Patient</Button>
    </form>
    <OutlinedCard/>
    <p> Operation was succesful!</p>
    </div> 
    </Container>
    </React.Fragment>
    )
  }
  
    
  return(
    <Container>       
        <ThemeProvider theme={theme}>
          <p> Your Patient Mangement page. Click on buttons below.</p>
          <form onClick={handleButton}>
          <Button variant="contained" sx={{mb: 3}} color='neutral' type="submit">Add New Patient</Button>
          <Button variant="contained" sx={{mb: 3}} color='neutral' type="submit">Remove Patient</Button>
          </form>
          <OutlinedCard/>
          <p>All Patiets</p>
          <div> { loading ? <div>Loading...</div> : <DataTable rows={data} columns={columns}/> }</div>
          
        </ThemeProvider>
      </Container>
  );
}

export default ManagePatient;