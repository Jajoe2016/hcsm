// import * as React from 'react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

//ui imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, ThemeProvider } from '@mui/material';
import theme from '../../reusables/theme';

async function loginUser(credentials) {
    return fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [usernameError, setUserNameError] = useState(false);
  const [password, setPassword] = useState();
  const token = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    setUserNameError(false);
    if (username === '!') {
      setUserNameError(true);
  }
    const data = await loginUser({ "username" : username, "password" : password });
    if (data.token) setToken(data.token);
    else setToken('-1');
    if (data.token !== "-1") sessionStorage.setItem('tokenFromLocalStore', data.token);
  }

  return(
    <React.Fragment>
          <h2> Please Login </h2>
          <form autoComplete="off" onSubmit={handleSubmit}>
          <ThemeProvider theme={theme}>
            <FormControl>
                <TextField label='Username' required sx={{mb: 3}} fullWidth variant='filled' size='small' type='string' color='neutral' error={usernameError} onChange={e => setUserName(e.target.value)}></TextField>
                <TextField label='Password' required sx={{mb: 6}} fullWidth variant='filled' size='small' type='password' color='neutral' onChange={e => setPassword(e.target.value)} ></TextField>
                <Button variant="contained" sx={{mb: 6}} type="submit">Login</Button>
            </FormControl>
            </ThemeProvider>
            </form>
        </React.Fragment>
  )

}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }