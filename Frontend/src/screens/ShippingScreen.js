import React, { useEffect, useState } from "react";
import AutoComplete from "react-google-autocomplete";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wraper from "../components/Utility/Wraper";
import { shippingObject } from "../store/shipping-slice";
import "../index.css";

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get shipping address
  const { shippingAddress } = useSelector((state) => state.shipping);
  //fill with the initial state
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [isformValid, setFormValid] = useState(false);
  const shippingObjValue = { address, city, postalCode, country };
  //simple check to make button disable and fill all the input
  useEffect(() => {
    const allInputFilled =
      address.length > 0 && city.length > 0 && country.length > 0;

    if (allInputFilled) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [address, city, postalCode, country]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(shippingObject(shippingObjValue));
    navigate("/payment");
  };
  //goggle auto complete form
  return (
    <Wraper>
      <div>
        <h2 className="text-center">Shipping page</h2>;
        <form className="shippingForm">
          <AutoComplete
            className="mb-5"
            placeholder="search for the place"
            apiKey={process.env.REACT_APP_GOOGLE_MAP_ID}
            onPlaceSelected={(place) => console.log(place)}
          />

          <div>
            <label htmlFor="address">Street Name</label>
            <input
              autoFocus
              required
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
              required
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
              required
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
              required
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <p className="fs-3 text-warning">
            We won't be able to do delivery,if your shipping address is not
            within our shipping radius(3km) from the shop. Sorry for the
            inconvience.
          </p>
          <button
            disabled={!isformValid}
            onClick={submitHandler}
            className="btn btn-success p-3 btn-lg fs-3"
          >
            Continue..
          </button>
        </form>
      </div>
    </Wraper>
  );
};

export default ShippingScreen;
