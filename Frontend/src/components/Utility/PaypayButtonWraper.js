import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypayButtonWraper = ({ value, successPaymentHandler }) => {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value,
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          successPaymentHandler(details);
        });
      }}
    ></PayPalButtons>
  );
};

export default PaypayButtonWraper;
