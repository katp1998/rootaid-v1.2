import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux';
import { logout } from '../features/auth/authSlice';
import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    Link
  } from '@mui/material/';

export default function NavBar()
{
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();

  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  const logOut = () =>
  {
    dispatch(logout());
    navigate('/');
  }

  return (
    <AppBar position='static'>
      <Toolbar style={{ backgroundColor: '#0f072c' }}>
        <Typography>
          <Link href={"/"} style={{ textDecoration: "none", color: "white", marginRight: "10px" }}>Home</Link>
        </Typography>

        <Box alignContent="right" sx={{ flexGrow: 1, textAlign: "right" }}>

          {isAuthenticated ?
            (
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
