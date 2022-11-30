import {Box, Typography, TextField, Button,AppBar,Toolbar} from '@mui/material/';
import  Link from 'next/link';
import { useRouter } from 'next/router'

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {logout , reset} from '../features/authSlice/auth.slice'
 

export default function NavBar() {

    const router = useRouter()
    const dispatch= useAppDispatch()
    const {user} = useAppSelector((state) => state.auth)

    

    const logOut = () =>{
      dispatch(logout())
      dispatch(reset())
      router.push('/')
    }


  return (
        <AppBar position='static'>
        <Toolbar>
        
          <Typography>
            <Link href={"/"} style={{textDecoration: "none", color:"white", marginRight:"10px"}}>Home</Link>
          </Typography>
          <Box alignContent="right" sx={{flexGrow: 1, textAlign: "right"}}>
          {user ? (
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
