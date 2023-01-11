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
              <Form.Control
                className="p-3 fs-3"
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Button
              variant="green"
              type="submit"
              className="btn btn-success me-5 p-3"
            >
              Subscribe for latest offers.
            </Button>
          </Form>
        </div>
        <div>
          <h2>Darwich Meats & CO</h2>
          <h4>
            <i className="fa-solid fa-phone"></i>{" "}
            <a href="tel:0297588655">0297588655</a>
          </h4>
          <h4>
            <i className="fa-solid fa-envelope"></i>{" "}
            <a href="mailto:darwichmeats@gmail.com"> darwichmeats@gmail.com</a>
          </h4>
          <h4>
            <i className="fa-solid fa-location-dot"></i> 355 Waterloo
            Rb,Greenacre NSW 2190
          </h4>
        </div>
        <div>
          <h2>We accept</h2>
          <h4>
            <i className="fa-brands fa-cc-amex"></i> AMex
          </h4>
          <h4>
            <i className="fa-solid fa-credit-card"></i> Credit/Debit Card
          </h4>
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
