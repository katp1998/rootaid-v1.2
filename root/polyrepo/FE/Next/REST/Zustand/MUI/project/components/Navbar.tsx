
import {
  Box,
  Typography,
  AppBar,
  Toolbar
} from '@mui/material/';
import authService from '../pages/api/authService'
import authStore from '../store/authStore';
import Link from '@mui/material/Link';

export default function NavBar() {

  const { auth, setAuth } = authStore((state: any) => ({
    auth: state.auth, setAuth: state.setAuth
  }))
  
  const logOut = () => {
    authService.logout();
    setAuth({ accessToken: '', isAuthenticated: false });
  }

  return (
    <AppBar position='static'>
      <Toolbar style={{ backgroundColor: '#0f072c' }}>
        <Typography>
          <Link href={"/"} style={{ textDecoration: "none", color: "white", marginRight: "10px" }}>Home</Link>
        </Typography>

        <Box alignContent="right" sx={{ flexGrow: 1, textAlign: "right" }}>
          {auth.isAuthenticated ? (
            <Typography style={{ textDecoration: "none", color: "white" }}>
              <Link href="/login" style={{ textDecoration: "none", color: "white", marginRight: "10px" }} onClick={logOut} >Logout</Link>
            </Typography>
          ) : (
            <Typography>
                <Link href={'/login'} style={{ textDecoration: "none", color: "white", marginRight: "10px" }} >
                  Login
                </Link>
                <Link href={'/register'} style={{ textDecoration: "none", color: "white", marginRight: "10px" }}>
                  Register
                </Link>
              </Typography>
          )}
        </Box> 
      </Toolbar>
    </AppBar>
  )
}