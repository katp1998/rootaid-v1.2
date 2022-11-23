import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'

function Header() {
  return (
    <><Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand href="/">REACT-REDUX FRONTEND APPLICATION</Navbar.Brand>
      <Nav className="d-flex">
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav>
    </Container>
  </Navbar></>
  )
}

export default Header