import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { login } from "../../store/login-slice";
import { useDispatch, useSelector } from "react-redux";

import Message from "../Utility/Message";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, message } = useSelector((state) => state.user);
  useEffect(() => {
    if (userInfo) {
      navigate("/shipping");
    }
  }, [navigate, userInfo]);
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className={styles.main}>
      <form className={styles.form}>
        {message && <Message variant="danger">{message}</Message>}
        <div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.formButton} onClick={loginHandler}>
            Login
          </button>
          <p>
            No Account?{" "}
            <span>
              <a href="/signup">Sign Up</a>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Form;
