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
          <Box alignItems='right' sx={{flexGrow:1, textAlign:'right'}}>
          {user && (
          <Typography>
              <Link to={"/private"} style={{textDecoration:'none' , color: 'white'}} >Private</Link>
          </Typography>
          )}
          {user ? (
            <Typography>
              <a href="/login" style={{textDecoration:'none' , color: 'white'}}  onClick={logOut}>Logout</a>
            </Typography>
          ):(
            <Typography>
              <Link to={"/login"} style={{textDecoration:'none' , color: 'white'}}>Login</Link>
              <Link to={"/register"} style={{textDecoration:'none' , color: 'white'}}>Register</Link>
            </Typography>
          )}
          </Box>
        </Toolbar>
      </AppBar>
  )
}