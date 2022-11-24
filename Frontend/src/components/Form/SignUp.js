import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import Message from "../Utility/Message";
import { register } from "../../store/register-slice";
import { useDispatch, useSelector } from "react-redux";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const registerObject = { name, email, password, passwordConfirm };
  useEffect(() => {
    if (userInfo) {
      navigate("/products");
    }
  }, [userInfo, navigate]);
  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setMessage("The password doesnot match,please type same password.");
    } else {
      dispatch(register(registerObject));
    }
    //dispatch the action for registration.
  };
  return (
    <div className={styles.main}>
      <form className={styles.form}>
        <div>
          {message && <Message variant="danger">{message}</Message>}
          <div>
            <label htmlFor="name">UserName</label>
            <input
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
          <div>
            <label htmlFor="passwordCon">Confirm Password</label>
            <input
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
            <span>
              <a href="/login">Login</a>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
