import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wraper from "../components/Utility/Wraper";
import { shippingObject } from "../store/shipping-slice";

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //get shipping address
  const { shippingAddress } = useSelector((state) => state.shipping);
  //fill with the initial state
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const shippingObjValue = { address, city, postalCode, country };
  console.log(shippingObjValue);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(shippingObject(shippingObjValue));
    navigate("/payment");
  };
  return (
    <Wraper>
      {/* <CheckoutStep step1 step2 /> */}
      <h2>Shipping page</h2>
      <form>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postalCode">PostalCode</label>
          <input
            type="number"
            id="postalCode"
            name="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button onClick={submitHandler} className="btn btn-block btn-dark">
          Continue..
        </button>
      </form>
    </Wraper>
  );
};

export default ShippingScreen;
