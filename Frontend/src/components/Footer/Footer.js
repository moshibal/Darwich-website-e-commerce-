import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { subscribe } from "../../store/subscribe-slice";
import styles from "./Footer.module.css";
import Message from "../Utility/Message";
import Loader from "../Utility/Loader";
const Footer = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { loading, success, successmessage, errormessage } = useSelector(
    (state) => state.subscibtion
  );
  const emailHandler = (e) => {
    e.preventDefault();
    dispatch(subscribe(email));
    setEmail("");
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.formDiv}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                className="p-3 fs-3"
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Button
              disabled={email.length === 0}
              onClick={emailHandler}
              variant="green"
              type="submit"
              className="btn btn-success me-5 p-3"
            >
              Subscribe for latest offers.
            </Button>
          </Form>
          {loading && <Loader />}
          {success && <Message>{successmessage}</Message>}
          {errormessage && <Message>{errormessage}</Message>}
        </div>

        <div>
          <h2>Darwich Meats & CO</h2>
          <h4>
            <i className="fa-solid fa-address-card"></i>{" "}
            <a href="/about">About Us</a>
          </h4>
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
          <h4>
            <i className="fa-solid fa-address-card"></i>{" "}
            <a href="/privacy">Privacy Policy</a>
          </h4>
          <h4>
            <i className="fa-solid fa-address-card"></i>{" "}
            <a href="/term">Terms</a>
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
