import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import Message from "../Utility/Message";
import { register } from "../../store/register-slice";
import { useDispatch, useSelector } from "react-redux";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    message: registerErrorMessage,
    success,
    userInfo,
  } = useSelector((state) => state.register);
  //component states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const registerObject = { name, email, password, passwordConfirm };
  useEffect(() => {
    if (userInfo && userInfo?.data) {
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    }
  }, [userInfo, navigate]);
  //register handler
  const registerHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setMessage("Please fill the user name");
    }
    if (email.trim() === "" && !email.includes("@")) {
      setMessage("Please type correct email address.");
    }
    if (password.trim() === "" || password !== passwordConfirm) {
      setMessage("The password doesnot match,please type same password.");
      setPassword("");
      setPasswordConfirm("");
    } else {
      dispatch(register(registerObject));
    }
  };
  return (
    <form className={styles.form}>
      <div>
        {message && <Message variant="danger">{message}</Message>}
        {registerErrorMessage && (
          <Message variant="danger">{registerErrorMessage}</Message>
        )}
        {success && (
          <Message variant="success">
            <p>signup successfully🤗🤗</p>
          </Message>
        )}
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            autoFocus
            required
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            minLength="10"
            required
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-black-50">
            the password must be 10 characters long.
          </p>
        </div>
        <div>
          <label htmlFor="passwordCon">Confirm Password</label>
          <input
            minLength="10"
            required
            type="password"
            id="passwordCon"
            name="confirmPassword"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button className={styles.formButton} onClick={registerHandler}>
          Sign Up
        </button>
        <p>
          Already have an account ?{" "}
          <span className={styles.span}>
            <a href="/login">Log In</a>
          </span>
        </p>
      </div>
    </form>
  );
}

export default SignUp;
