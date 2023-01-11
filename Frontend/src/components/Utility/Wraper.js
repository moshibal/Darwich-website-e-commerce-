import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import styles from "./index.module.css";
import { logout } from "../../store/login-slice";

const Wraper = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className={styles.main}>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="p-4"
      >
        <Container className={styles.navContainer}>
          <Navbar.Brand href="/" className="fs-2">
            Darwich Meats & CO
          </Navbar.Brand>

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
          </Nav>
        </Container>
      </Navbar>

      <div className={styles.middleDiv}>{children}</div>

      <div className={styles.copyright}>
        <div className={styles.displayBottom}>
          <span>copyright </span>
          <span>{new Date().getFullYear()} </span>
          <span>Darwich Meats & Co</span>
        </div>
      </div>
    </div>
  );
};

export default Wraper;
