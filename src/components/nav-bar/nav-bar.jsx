import { React } from "react";
import "./nav-bar.scss";
import { FaRegUser } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

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
      bg="white"
      expand="lg"
      className="main-nav"
      sticky="top"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand className="navbar-logo">
          <Nav.Link as={Link} to="/" href="/">
            myFlix
          </Nav.Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <TbMovie className="hamburger" />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link
                as={Link}
                className="user"
                to={`/users/${user?.Username}`}
                href={`/users/${user?.Username}`}
              >
                <FaRegUser className="usericon" />
                {user?.Username}
              </Nav.Link>
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
