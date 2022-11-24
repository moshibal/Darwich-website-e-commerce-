import React from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.formDiv}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Subscribe for latest offers.
            </Button>
          </Form>
        </div>
        <div>
          <h2>About us</h2>
          <h3>Darwich Meats & CO</h3>

          <h3>
            <i className="fa-solid fa-phone"></i> 983742939292
          </h3>
          <h3>
            <i className="fa-solid fa-envelope"></i> 3darwich@gmail.com
          </h3>
          <div></div>
        </div>
        <div>
          <h2>We accept</h2>
          <h3>
            <i className="fa-brands fa-cc-amex"></i> AMex
          </h3>
          <h3>
            <i className="fa-solid fa-credit-card"></i> Credit Card
          </h3>
        </div>
      </div>
      <div>
        <div className={styles.copyright}>
          <span>copyright</span>
          <span>{new Date().getFullYear()}</span>
          <span>Darwich Meats & Co</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
