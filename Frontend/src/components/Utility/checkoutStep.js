import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <NavItem>
        {step1 ? (
          <Link to="/login">Sign In</Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step2 ? (
          <Link to="/shipping">Shipping</Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step3 ? (
          <Link to="/payment">Payment</Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step4 ? (
          <Link to="/placeorder">Place Order</Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </NavItem>
    </Nav>
  );
};

export default CheckoutSteps;
