import React from  'react';
import './nav-bar.scss'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'


export function NavBar({user}) {

  function onLoggedOut() {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if(typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar className = "main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className="navbar-logo" 
        href="/">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link className="user" href={`/users/${user?.Username}`}>{user?.Username}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
            )}
            {!isAuth() && (<Nav.Link href="/">Sign In</Nav.Link>)}
            {!isAuth() && (<Nav.Link href="/register">Register</Nav.Link>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}