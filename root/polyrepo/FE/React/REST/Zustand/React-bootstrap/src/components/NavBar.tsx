import {useEffect,useState} from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import authService from '../api/authService'

import useStore from '../store/store';

export default function NavBar() {

  const navigate = useNavigate()
  const user = useStore((state:any) => state.user)
  const isLoggedIn = useStore((state:any) => state.isLoggedIn)
  const setUserStore = useStore((state:any) => state.setUserStore)
  const logout  = useStore((state:any) => state.logout)

  useEffect(() =>  {
    const existingUser = authService.getCurrentUser();

    if (existingUser) {
      setUserStore(existingUser.name);
    }
  },[])

  const logOut = () =>{
    authService.logout()
    logout()
    navigate('/')
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {isLoggedIn ? (
              <Nav.Link href="/login" onClick={logOut}>Logout</Nav.Link>
          ):(
          <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      // <AppBar  position='static'>
      //   <Toolbar>
      //     <Typography>
      //       <Link to={"/"}>Home</Link>
      //     </Typography>
      //     {user.isLoggedIn && (
      //     <Typography>
      //         <Link to={"/private"} >Private</Link>
      //     </Typography>
      //     )}
      //     {user.isLoggedIn ? (
      //       <Typography>
      //         <a href="/login"  onClick={logOut}>Logout</a>
      //       </Typography>
      //     ):(
      //       <Typography>
      //         <Link to={"/login"}>Login</Link>
      //         <Link to={"/register"}>Register</Link>
      //       </Typography>
      //     )}
      //   </Toolbar>
      // </AppBar>
  )
}