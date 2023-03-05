// import * as React from 'react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from '../../reusables/container';

//ui imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, ThemeProvider } from '@mui/material';
import theme from '../../reusables/theme';

async function getUser(credentials) {
    return fetch('http://localhost:3001/getuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Account() {
  const [username, setUserName] = useState();
  const [usernameError, setUserNameError] = useState(false);
  const [password, setPassword] = useState();
  const token = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    setUserNameError(false);
    const data = await getUser({ "username" : username});
  };

  const displayUser = () => {};
  

    return (       
      <React.Fragment>
        <Container>
        <div>
            <p>This is your account details</p>
        <ThemeProvider theme={theme}>
        <Button variant="contained" sx={{mb: 6}} type="submit">Edit</Button>
        </ThemeProvider>
        </div>
        </Container>
        </React.Fragment>
        )

}