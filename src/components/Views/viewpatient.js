import React, { useState } from 'react';
import Container from '../../reusables/container';
import useFetchPost from '../Helpers/useFetchPost';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


//ui imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, ThemeProvider, Stack } from '@mui/material';
import theme from '../../reusables/theme';

async function updateUser(body) {
    return fetch('http://localhost:3001/updateuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(data => data.json())
   }

export default function ViewPatient(username) {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  
  const body = {"username" : username};
  const {loading,data} = useFetchPost("http://localhost:3001/getuser", body);
  
  const handleSubmit = async e => {
    e.preventDefault()
    if (password == undefined) setPassword(data[0].password)
    if (email == undefined) setEmail(data[0].email)
    const dataupd = await updateUser({ "username" : `${sessionStorage.getItem('userFromLocalStore')}`, "password" : password, "email": email});
  };

  const handleAfterLoad = () => {
    setPassword(data[0].password)
    setEmail(data[0].email)    
  }

    return (
      <React.Fragment> 
            <ThemeProvider theme={theme}>
            <Typography variant="subtitle1" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Box sx={{ width: 500, height: 50 }}> This is your account details. Click save to update</Box>
          <form onSubmit={handleSubmit}>
              <FormControl>
              <div> { loading ? <CircularProgress/> : 
               <div>
               <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
                 <TextField defaultValue={data[0].username} name="name" label='username' sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral'></TextField>
                 <TextField defaultValue={data[0].password} name="password" label='password' sx={{mb: 1}} variant='filled' size='small' type='password' color='neutral' onChange={e => setPassword(e.target.value)}></TextField>
               </Stack>
               <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                 <TextField defaultValue={data[0].email} name="email" label='email' sx={{mb: 1}} variant='filled' size='medium' type='email' color='neutral' onChange={e => setEmail(e.target.value)}></TextField>
               </Stack> 
               </div>
                } </div>
                <Button variant="contained" sx={{mb: 3}} color='neutral' type="submit">save</Button>
              </FormControl>
          </form>
          </Typography>
          </ThemeProvider>
          </React.Fragment>
        )
}