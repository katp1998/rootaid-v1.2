import { useSelector, useDispatch } from 'react-redux' 
import { RootState } from '../store/store'; 
import { logout } from '../store/slices/authSlice';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import authService from '../pages/api/authService'

export default function NavBar() {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)  
  const dispatch = useDispatch()

  const logOut = () =>{
    authService.logout()
    dispatch(logout())
  }

  return (
    <Navbar bg="light" expand="lg" className='mb-4'>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {isAuthenticated ? (
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