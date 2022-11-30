import {Box, Typography, TextField, Button,AppBar,Toolbar} from '@mui/material/';
import  Link from 'next/link';
import { useRouter } from 'next/router'

import authService from '../api/authService'

import { useAuth } from '../contexts/AuthContext'; //React Context

export default function NavBar() {

    const router = useRouter()
    const {user, logout, isLoggedIn} = useAuth()


    

    const logOut = () =>{
      authService.logout()
      logout()
      router.push('/')
    }


  return (
        <AppBar position='static'>
        <Toolbar>
        
          <Typography>
            <Link href={"/"} style={{textDecoration: "none", color:"white", marginRight:"10px"}}>Home</Link>
          </Typography>
          <Box alignContent="right" sx={{flexGrow: 1, textAlign: "right"}}>
          {isLoggedIn ? (
            <Typography style={{textDecoration: "none", color:"white"}}>
              <a href="/login"  onClick={logOut} style={{textDecoration: "none", color:"white", marginRight:"10px"}}>Logout</a>
            </Typography>
          ):(
            <Typography>
              <Link href={'/login'} style={{textDecoration: "none", color:"white", marginRight:"10px"}} >
                Login
              </Link>
              <Link href={'/register'} style={{textDecoration: "none", color:"white", marginRight:"10px"}}>
                Register
              </Link>
            </Typography>
          )}
          </Box> 
        </Toolbar>
      </AppBar>
  )
}
