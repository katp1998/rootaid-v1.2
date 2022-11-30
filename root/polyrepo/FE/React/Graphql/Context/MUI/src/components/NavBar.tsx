import {Box, Typography, TextField, Button,AppBar,Toolbar} from '@mui/material/';
import { Link, useNavigate } from 'react-router-dom'

import authService from '../api/authService'

import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {

  const navigate = useNavigate()
  const {user, logout, isLoggedIn} = useAuth()

  const logOut = () =>{
    authService.logout()
    logout()
    navigate('/')
  }
  return (
    <AppBar position='static'>
    <Toolbar>
    
      <Typography>
        <Link to={"/"} style={{textDecoration: "none", color:"white", marginRight:"10px"}}>Home</Link>
      </Typography>
      <Box alignContent="right" sx={{flexGrow: 1, textAlign: "right"}}>
      {isLoggedIn ? (
        <Typography style={{textDecoration: "none", color:"white"}}>
          <a href="/login"  onClick={logOut} style={{textDecoration: "none", color:"white", marginRight:"10px"}}>Logout</a>
        </Typography>
      ):(
        <Typography>
          <Link to={"/login"} style={{textDecoration: "none", color:"white", marginRight:"10px"}} >Login</Link>
          <Link to={"/register"} style={{textDecoration: "none", color:"white", marginRight:"10px"}} >Register</Link>
        </Typography>
      )}
      </Box> 
    </Toolbar>
  </AppBar>
)
}