import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <Navbar expand="sm" style={{ backgroundColor: "#131313" }} variant="dark">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" className="me-2 logo">
            eCOM
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="me-2">
              Home
            </NavLink>
            <NavLink to="/cart" className="me-2">
              Cart
            </NavLink>
            <NavLink to="/contact" className="me-2">
              Contact
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
