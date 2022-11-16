import {useEffect,useState} from 'react'
import {Box, Typography, TextField, Button,AppBar,Toolbar} from '@mui/material/';
import { Link } from 'react-router-dom'

import authService from '../api/authService'



export default function NavBar() {

  const [currentUser,setUser] = useState(undefined)

  useEffect(() =>  {
    const user = authService.getCurrentUser();

    if (user) {
      setUser(user);
    }
  },[])

  const logOut = () =>{
    authService.logout()
  }
  return (
      <AppBar>
        <Toolbar>
          <Typography>
            <Link to={"/"}>Home</Link>
          </Typography>
          {currentUser && (
          <Typography>
              <Link to={"/private"} >Private</Link>
          </Typography>
          )}
          {currentUser ? (
            <Typography>
              <a href="/login"  onClick={logOut}>Logout</a>
            </Typography>
          ):(
            <Typography>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
  )
}