import React from  'react';
import './nav-bar.scss'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { FaRegUser } from "react-icons/fa";
export function NavBar({ user }) {
  function onLoggedOut() {
    localStorage.clear();
    window.open("/myflix-v2", "_self");
  }

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="white"
      expand="lg"
      class="shadow-5-strong"
    >
      <Container>
        <Navbar.Brand className="navbar-logo">
          <Link to="/">myFlix</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Link className="user" to={`/users/${user?.Username}`}>
                <FaRegUser className="usericon" />
                {user?.Username}
              </Link>
            )}

            {isAuth() && (
              <a
                href="https://fredpasqua.github.io/my-portfolio/ "
                className="portfolio"
              >
                Portfolio
              </a>
            )}
            {isAuth() && (
              <Button
                className="logout"
                variant="link"
                onClick={() => {
                  onLoggedOut();
                }}
              >
                Logout
              </Button>
            )}
            {!isAuth() && (
              <Link className="user" to="/">
                Sign In
              </Link>
            )}
            {!isAuth() && (
              <Link className="user" to="/register">
                Register
              </Link>
            )}
            {!isAuth() && (
              <a
                href="https://fredpasqua.github.io/my-portfolio/"
                className="portfolio"
              >
                Portfolio
              </a>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}