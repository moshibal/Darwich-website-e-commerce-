import React from "react";
import styles from "./Form.module.css";

function Form() {
  return (
    <div className={styles.main}>
      <form className={styles.form}>
        <div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="text" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="email" />
          </div>
          <button className={styles.formButton}>Login</button>
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
