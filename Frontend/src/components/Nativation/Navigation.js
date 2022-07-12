import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Darwich Meats & CO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">About Us</Nav.Link>
            <Nav.Link href="#">Contact Us</Nav.Link>
            <NavDropdown title="Category" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#">Beef</NavDropdown.Item>
              <NavDropdown.Item href="#">Lamb</NavDropdown.Item>
              <NavDropdown.Item href="#chicken">Chicken</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Other Items</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/login">
              <i class="fa-solid fa-user"></i> Login
            </Nav.Link>
            <Nav.Link href="#">
              <i class="fa-solid fa-cart-shopping"></i> Cart
            </Nav.Link>
            .
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
