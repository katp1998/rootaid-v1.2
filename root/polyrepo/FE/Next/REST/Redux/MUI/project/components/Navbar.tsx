import { useAppSelector, useAppDispatch } from '../hooks/hooks' 
import { logout } from '../features/auth/authSlice';
import {Box, Typography, AppBar,Toolbar} from '@mui/material/';
import  Link from 'next/link';
import authService from '../pages/api/authService'

export default function NavBar() {

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const dispatch = useAppDispatch()  

  const logOut = () =>{
    authService.logout()
    dispatch(logout())
  }

  return (
        <AppBar position='static'>
        <Toolbar>
        
          <Typography>
            <Link href={"/"} style={{textDecoration: "none", color:"white", marginRight:"10px"}}>Home</Link>
          </Typography>
          <Box alignContent="right" sx={{flexGrow: 1, textAlign: "right"}}>
          {isAuthenticated ? (
            <Typography style={{textDecoration: "none", color:"white"}}>
              <Link href="/login" onClick={logOut} >Logout</Link>
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