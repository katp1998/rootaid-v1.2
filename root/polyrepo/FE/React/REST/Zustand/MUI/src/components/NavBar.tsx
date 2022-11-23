import {useEffect,useState} from 'react'
import {Box, Typography, TextField, Button,AppBar,Toolbar} from '@mui/material/';
import { Link } from 'react-router-dom'

import authService from '../api/authService'

import useStore from '../store/store';

export default function NavBar() {

  //const [currentUser,setUser] = useState(undefined)
  const user = useStore((state:any) => state.user)
  const setUser = useStore((state:any) => state.setUser)

  useEffect(() =>  {
    const existingUser = authService.getCurrentUser();

    if (existingUser) {
      setUser(existingUser);
    }
  },[])

  const logOut = () =>{
    authService.logout()
  }
  return (
      <AppBar  position='static'>
        <Toolbar>
          <Typography>
            <Link to={"/"}>Home</Link>
          </Typography>
          {user.isLoggedIn && (
          <Typography>
              <Link to={"/private"} >Private</Link>
          </Typography>
          )}
          {user.isLoggedIn ? (
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