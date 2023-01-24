import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/login-slice";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="p-4"
    >
      <Container className="container-fluid d-flex justify-content-between">
        <Navbar.Brand href="/" className="fs-2">
          Darwich Meats & CO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className=" d-flex justify-content-end"
        >
          <Nav>
            {userInfo && userInfo?.data?.name ? (
              <NavDropdown title={userInfo.data.name} id="username">
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>

                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">
                <i className="fa-solid fa-user"></i> Login
              </Nav.Link>
            )}

            <Nav.Link href="/cart">
              <i className="fa-solid fa-cart-shopping"></i> Cart
            </Nav.Link>
            {userInfo && userInfo?.data?.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
