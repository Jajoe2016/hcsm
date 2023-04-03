import React, { useState } from 'react';
import PrimarySearchAppBar from './header';
import FooterBar from './footer';
import { BrowserRouter as Router, Routes,Route, Link} from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import PropTypes from 'prop-types';

import Logout from '../components/Login/Logout';

// drawer imports
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';


import Home from '../components/Views/home';
import Account from '../components/operations/account'
import ManagePatient from '../components/operations/manageappt';
;
class Container extends React.Component {
    constructor(props){
        super();
        this.state = {
            menuOpen : false
        }
    }
    
    sidebar = () => {
        const tokenFromLocalStore =  sessionStorage.getItem('tokenFromLocalStore');
        if (!tokenFromLocalStore) {
        return(<div></div>);
        }
        else{
            const navigate = (destination) => {
                window.location.assign(destination);
            }
            return (
                <ThemeProvider theme={theme}>
                <Drawer open={this.state.menuOpen}
                onClose={() => {this.setState({menuOpen: false})}}>
                    <ListItem>
                        <ListItemButton onClick={() => {navigate("/")}}>
                            <ListItemText primary={"Home"}> </ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton onClick={() => {navigate("/account")}}>
                            <ListItemText primary={"Account"}> </ListItemText>
                        </ListItemButton>
                    </ListItem>

                    {/* <ListItem Button onClick={() => {navigate("/account")}}>
                    <Button color="inherit">Account</Button>
                    </ListItem> */}

                    <ListItem>
                        <ListItemButton onClick={() => {navigate("/manageappointments")}}>
                            <ListItemText primary={"ManageAppts"}> </ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton onClick={() => {navigate("/managepatients")}}>
                            <ListItemText primary={"ManagePatients"}> </ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton onClick={() => {navigate("/logout")}}>
                            <ListItemText primary={"Logout"}> </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    
                </Drawer>
                </ThemeProvider>
            )
        }
    }
    header = () => {
        return (
            <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    onClick={() => {this.setState({menuOpen: true})}} 
                    size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    HealthCare Management System
                </Typography>
                {/* <Button color="inherit">Account</Button> */}
                </Toolbar>
            </AppBar>
            </Box>
            </ThemeProvider>
        );
    }

    footer = () => {
        return (
            <ThemeProvider theme={theme}>
              <Box sx={{ flexGrow: 1 }}>
                <Toolbar style={{position: 'static', backgroundColor:'#525252'}}>
                  <div>Copyright-2023</div>
                  {/* <ul>
                    <li>
                        <Link to="/"> <a> Home </a></Link>
                    </li>
                    <li>
                        <Link to="/account"><a> Account </a></Link>
                    </li>
                </ul> */}
                </Toolbar>
              </Box>
            </ThemeProvider>
          );
    }

    render(){
        return(<div>
            {this.sidebar()}
            {this.header()}
            <div style={{minheight: '100vh'}}>{this.props.children}</div>
            {this.footer()}
        </div>)
    }
}

export default Container;