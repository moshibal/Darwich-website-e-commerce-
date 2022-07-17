import React from "react";
import styles from "./SignUp.module.css";

function SignUp() {
  return (
    <div className={styles.main}>
      <form className={styles.form}>
        <div>
          <div>
            <label htmlFor="name">UserName</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="text" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div>
            <label htmlFor="passwordCon">Confirm Password</label>
            <input type="password" id="passwordCon" name="confirmPassword" />
          </div>
          <button className={styles.formButton}>Sign Up</button>
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
