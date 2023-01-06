
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import authService from '../pages/api/authService'
import authStore from '../store/authStore';
import {
  useEffect,
} from 'react'

export default function NavBar() {

  const { auth, setAuth } = authStore(
    (state: any) => ({ auth: state.auth ,setAuth:state.setAuth}));

    const logOut = () =>{
      authService.logout()
      setAuth({accessToken:'',isLoggedIn:false})
    }

    useEffect(() => {
      console.log(auth.isLoggedIn);
   
    }, []);

  return (
    <Navbar bg="light" expand="lg" className='mb-4'>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {auth.isLoggedIn ? (
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
  )
}