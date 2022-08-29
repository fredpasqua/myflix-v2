import React from  'react';
import './nav-bar.scss'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

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
        <Navbar.Brand className="navbar-logo">
        <Link to="/">myFlix</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Link className="user" to={`/users/${user?.Username}`}>{user?.Username}</Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
            )}
            {!isAuth() && (<Link to="/">Sign In</Link>)}
            {!isAuth() && (<Link to="/register">Register</Link>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}