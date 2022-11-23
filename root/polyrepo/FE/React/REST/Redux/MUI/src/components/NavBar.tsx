import {useEffect,useState} from 'react'
import {Box, Typography, TextField, Button,AppBar,Toolbar} from '@mui/material/';
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {logout , reset} from '../features/authSlice/auth.slice'


export default function NavBar() {

  const navigate = useNavigate()
  const dispatch= useAppDispatch()
  const {user} = useAppSelector((state) => state.auth)


  const logOut = () =>{
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
      <AppBar  position='static'>
        <Toolbar>
          <Typography>
            <Link to={"/"}>Home</Link>
          </Typography>
          {user && (
          <Typography>
              <Link to={"/private"} >Private</Link>
          </Typography>
          )}
          {user ? (
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