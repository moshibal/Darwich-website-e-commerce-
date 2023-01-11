import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Wraper from "../components/Utility/Wraper";
import Message from "../components/Utility/Message";
import Loader from "../components/Utility/Loader";
import styles from "../components/Form/Form.module.css";
import {
  resetPasswordReset,
  submitResetpassword,
} from "../store/reset-password-slice";

const ResetPasswordScreen = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { loading, success, error } = useSelector(
    (state) => state.resetPassword
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordReset());
    dispatch(submitResetpassword({ password, passwordConfirm }, token));
    setPassword("");
    setPasswordConfirm("");
  };
  return (
    <Wraper>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          {success && (
            <Message>
              Please head back to login page🤗
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
          <h3>Please type your password.</h3>
          <div>
            <label htmlFor="password">Password</label>
            <input
              autoFocus
              required
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordconfirm">Confirm Password</label>
            <input
              required
              type="password"
              id="passwordconfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <button className={styles.formButton} type="submit">
            Submit
          </button>
          <p className="text-warning bg-dark p-3">
            Submit after changing the password.Thank you.
          </p>
        </div>
      </form>
    </Wraper>
  );
};

export default ResetPasswordScreen;
