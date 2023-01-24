import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Form.module.css";
import { login } from "../../store/login-slice";
import { useDispatch, useSelector } from "react-redux";

import Message from "../Utility/Message";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, message } = useSelector((state) => state.user);
  useEffect(() => {
    if (userInfo && userInfo?.data) {
      navigate("/products");
    }
  }, [navigate, userInfo]);
  const loginHandler = (e) => {
    e.preventDefault();
    if (email.length > 0 && email.includes("@")) {
      dispatch(login(email, password));
    } else {
      setEmailCheck("Please type correct email address.");
    }
  };
  return (
    <form className={styles.form}>
      <div>
        {message && <Message variant="danger">{message}</Message>}
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            autoFocus
            required
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailCheck && <p>{emailCheck}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.formButton} onClick={loginHandler}>
          Log In
        </button>
        <span className={styles.span}>
          <Link to="/forgotpassword" className={styles.formButton}>
            Fail To Remember?
          </Link>
        </span>
        <p>
          Have No Account ?{" "}
          <span className={styles.span}>
            <Link to="/signup">Register Now</Link>
          </span>
        </p>
      </div>
    </form>
  );
}

export default Form;
