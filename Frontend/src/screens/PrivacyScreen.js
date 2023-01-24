import React from "react";
import styles from "../components/css/Privacy.module.css";
import Wraper from "../components/Utility/Wraper";

const PrivacyScreen = () => {
  return (
    <Wraper>
      <div className={styles.privacy}>
        <p className="fs-2">
          Welcome to Darwich Meats & Co's website. We are committed to providing
          our customers with high-quality halal meats and excellent service. By
          using our website, you agree to the following terms and conditions:
        </p>
        <ul>
          <li>
            All products sold on our website are certified halal and sourced
            from reputable suppliers.
          </li>
          <li>
            We do our best to ensure that all information on our website is
            accurate and up-to-date, but we cannot guarantee that it is free
            from errors or omissions.
          </li>
          <li>
            We reserve the right to change prices and product availability
            without notice.
          </li>
          <li>
            We do not sell or share any of your personal information with third
            parties.
          </li>
          <li>
            We are not responsible for any damages resulting from the use of our
            website or products.
          </li>
          <li>
            By placing an order on our website, you confirm that you have read
            and agree to these terms and conditions.
          </li>
        </ul>
        <p className="fs-2">Thank you for choosing Darwich Meats & Co.</p>
      </div>
    </Wraper>
  );
};

export default PrivacyScreen;
