import React from "react";
import styles from "../components/css/Privacy.module.css";
import Wraper from "../components/Utility/Wraper";
const TermScreen = () => {
  return (
    <Wraper>
      <div className={styles.privacy}>
        <p className="fs-2">
          Welcome to the Darwich Meats & Co's website. By accessing or using our
          website, you agree to be bound by the following terms and conditions:
        </p>
        <ul>
          <li>
            <strong>Eligibility:</strong> Our website is intended for use by
            individuals who are at least 16 years old. By using our website, you
            represent and warrant that you are at least 16 years old and that
            you have the right, authority, and capacity to accept these terms
            and conditions.
          </li>
          <li>
            <strong>Website Content:</strong> All content on our website,
            including text, images, logos, and other materials, is the property
            of Darwich Meats & Co and is protected by copyright and trademark
            laws. You may not use or reproduce any of this content without our
            express written consent.
          </li>
          <li>
            <strong>Orders:</strong> All orders placed on our website are
            subject to acceptance by Darwich Meats & Co. We reserve the right to
            refuse any order for any reason.
          </li>
          <li>
            <strong>Payments:</strong> All payments for orders must be made by
            credit card or cash. We do not accept checks.
          </li>
          <li>
            <strong>Shipping and Delivery:</strong> We will ship your order to
            the address provided at the time of purchase. Shipping and handling
            fees will be added to the total cost of your order. We are not
            responsible for any delays or damages that occur during shipping.
          </li>
          <li>
            <strong>Returns and Refunds:</strong> If you are not satisfied with
            your order, you may return it for a refund within 1 day of receipt.
            All returns must be in their original packaging and in good
            condition. Custom orders are non-refundable.
          </li>
          <li>
            <strong>Liability:</strong> Darwich Meats & Co will not be liable
            for any damages arising from the use of our website or products.
          </li>
          <li>
            <strong>Changes to Terms and Conditions:</strong> We reserve the
            right to change these terms and conditions at any time without
            notice.
          </li>
        </ul>
        <p className="fs-2">
          By using our website, you acknowledge that you have read and agree to
          these terms and conditions. If you do not agree to these terms, please
          do not use our website."
        </p>
      </div>
    </Wraper>
  );
};

export default TermScreen;
