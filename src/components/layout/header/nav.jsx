import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../../hooks/useCart";

function NavBar() {
  const { cart } = useCart();
  return (
    <Navbar expand="sm" style={{ backgroundColor: "#131313" }} variant="dark">
      <Container className="ms-auto">
        <Navbar.Brand>
          <NavLink to="/" className="me-2 logo">
            eCOM
          </NavLink>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto text-center" style={{ fontSize: "25px" }}>
            <NavLink to="/" className="me-2">
              Home
            </NavLink>

            <NavLink to="/contact" className="me-2">
              Contact
            </NavLink>
            <NavLink to="/cart" className="me-2 d-sm-none">
              Cart
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="right d-flex align-items-center">
        <NavLink to="/cart" className="me-2">
          <FaShoppingCart size={32} />
          {cart.length > 0 && <div className="cartAmount">{cart.length}</div>}
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </div>
    </Navbar>
  );
}

export default NavBar;
