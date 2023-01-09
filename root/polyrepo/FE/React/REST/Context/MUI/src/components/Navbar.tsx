import { useNavigate } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth';
import authService from '../api/authService';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Link
} from '@mui/material/';

export default function NavBar() {

  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const logOut = () => {
    authService.logout();
    setAuth({ accessToken: '', isAuthenticated: false });
    navigate('/');
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
