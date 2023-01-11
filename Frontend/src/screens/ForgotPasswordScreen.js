import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Wraper from "../components/Utility/Wraper";
import Message from "../components/Utility/Message";
import Loader from "../components/Utility/Loader";
import styles from "../components/Form/Form.module.css";
import {
  forgetpasswordReset,
  submitForgetpassword,
} from "../store/forget-password-slice";

const ForgotPasswordScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { loading, success, error } = useSelector(
    (state) => state.forgetpassword
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetpasswordReset());
    dispatch(submitForgetpassword({ email }));
    setEmail("");
  };

  return (
    <Wraper>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          {success && (
            <Message>
              Email sent , please check your email address to reset password.
              <Link
                className=" ms-5 fs-3 text-uppercase fw-bold text-decoration-underline"
                to="/login"
              >
                Log In &#8594;
              </Link>
            </Message>
          )}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <h3>Please type your email address.</h3>
          <div>
            <label htmlFor="email">Email</label>
            <input
              autoFocus
              required
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className={styles.formButton} type="submit">
            Submit
          </button>
          <p className="text-warning bg-dark p-3">
            Reset Link will be sent to your email address after you submit your
            email address and is only valid for 10 minutes . If you can't make
            it in 10 minutes, submit the form again.Thank you.
          </p>
        </div>
      </form>
    </Wraper>
  );
};

export default ForgotPasswordScreen;
