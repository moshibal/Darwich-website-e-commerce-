import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Wraper from "../components/Utility/Wraper";
import { paymentAction } from "../store/payment-slice";

const PaymentScreen = () => {
  const [payment, setPayment] = useState("paypal");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shippingAddress = useSelector((state) => state.shipping);

  //simple check for shipping details
  useEffect(() => {
    dispatch(paymentAction(payment));
  }, [payment, dispatch]);
  if (!shippingAddress) navigate("/shipping");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/placeorder");
  };
  return (
    <Wraper>
      <h2>Payment page</h2>
      <form>
        <input
          defaultChecked
          type="radio"
          id="paypal"
          name="payment"
          value="paypal"
          onClick={(e) => setPayment(e.target.value)}
        />
        <label htmlFor="paypal">paypal</label>
        <br></br>
        <input
          type="radio"
          id="stripe"
          name="payment"
          value="stripe"
          onClick={(e) => setPayment(e.target.value)}
        />
        <label htmlFor="stripe">Stripe</label>
        <br></br>

        <button
          onClick={submitHandler}
          className="btn btn-success p-3 btn-lg fs-3"
        >
          Continue..
        </button>
      </form>
    </Wraper>
  );
};

export default PaymentScreen;
