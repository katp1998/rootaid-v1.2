import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth';
import authService from '../api/authService';

export default function NavBar()
{
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const logOut = () => {
    authService.logout();
    setAuth({ accessToken: '', isAuthenticated: false });
    navigate('/');
  }

  return (
    <Navbar style={{ backgroundColor: '#0f072c' }} expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={{ color: "#ffffff" }}>Home</Nav.Link>
            
            {auth.isAuthenticated ? (
              <Nav.Link href="/login" style={{ color: "#ffffff" }} onClick={logOut}>Logout</Nav.Link>
            ) : (
                <>
                  <Nav.Link href="/login" style={{ color: "#ffffff" }} >Login</Nav.Link>
                  <Nav.Link href="/register" style={{ color: "#ffffff" }}>Register</Nav.Link>
                </>
          
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
