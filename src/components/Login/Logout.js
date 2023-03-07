import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from '../../reusables/container';

export default function Logout({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const token = useState();
  setToken(undefined)
  sessionStorage.removeItem('tokenFromLocalStore');
  window.location.assign('/');

  return(
    <React.Fragment>
      <Container>
              <div>
                  <p> Succesfully Loggged out </p>
              </div>
      </Container>
    </React.Fragment>
  )

}
Logout.propTypes = {
    setToken: PropTypes.func.isRequired
  }