import React from "react";
import Wraper from "../components/Utility/Wraper";
import styles from "../components/css/About.module.css";

const AboutScreen = () => {
  return (
    <Wraper>
      <div className={styles.about}>
        <p className="fs-1">
          <strong>Welcome to Darwich Meats & Co</strong>, a family-owned
          business that specializes in the sale of premium quality halal
          chicken, beef, and lamb. Our meats are sourced from reputable farms
          and are certified halal by recognized Islamic organizations.
        </p>
        <p className="fs-2">
          At Darwich Meats & Co, we take great pride in providing our customers
          with high-quality meats that are both delicious and healthy. Our meats
          are carefully selected and prepared to ensure that they are of the
          best quality and taste. We believe that everyone should have access to
          healthy, high-quality meats, and that's why we make sure that all of
          our products are halal certified.
        </p>
        <p className="fs-2">
          We believe in providing our customers with exceptional service and we
          strive to make sure that every customer is satisfied with their
          purchase. Our friendly and knowledgeable staff are always on hand to
          answer any questions you may have and to help you find the perfect
          cuts of meat for your needs.
        </p>
        <p className="fs-2">
          Thank you for choosing Darwich Meats & Co, we look forward to serving
          you.
        </p>
      </div>
    </Wraper>
  );
};

export default AboutScreen;
