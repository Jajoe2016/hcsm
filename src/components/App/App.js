import React, { useState } from 'react';
import { BrowserRouter as Router, Routes,Route, Link} from 'react-router-dom';
import Home from '../Views/home';
import Account from '../Views/account';
import ViewPatients from '../Views/viewpatients';
import ManagePatient from '../operations/managepatient'

// import Preferences from '../Preferences/Preferences';
// import Operations from '../Operations/Operations'
import Login from '../Login/Login';
import Logout from '../Login/Logout';
import Container from '../../reusables/container';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import theme from '../../reusables/theme';




function App() {
    const [token, setToken] = useState();
    const tokenFromLocalStore =  sessionStorage.getItem('tokenFromLocalStore');
    console.log(`from router token: `,token);
    console.log(`from router  sessionStorage`,  sessionStorage);
    console.log(`from router: tokenFromLocalStore`,tokenFromLocalStore);

    if (!tokenFromLocalStore || tokenFromLocalStore == null) {
        if(token === undefined) {
          return (            
            <div>
            <Container> <Login setToken={setToken}/></Container>
            </div>)
        }
        if (token === "-1"){
            return (
             <div>
           <Container> <Login setToken={setToken}/>
           <p>Login Error. Invalid username or password</p>
           </Container>
           </div>)
        }
        if (token === "-2"){
          return (
           <div>
            <Container> <Login setToken={setToken}/>
            </Container>
         </div>)
      }
      }

      return (
        <div> 
        <Router>        
          <Routes>
            <Route path="/" element={<Home />}> </Route>
            <Route path="/account" element={<Account />}> </Route>
            <Route path="/managepatients" element={<ManagePatient />}> </Route>
            <Route path="/viewpatients" element={<ViewPatients />}> </Route>
            { tokenFromLocalStore && 
            <Route path="/logout" element={<Logout setToken={setToken}/>}> </Route>
            }
            
          </Routes>
        </Router>
        </div>
      )  

}

export default App;