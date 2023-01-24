import React, { useEffect, useState } from "react";
// import AutoComplete from "react-google-autocomplete";

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
  const [unit, setUnit] = useState(shippingAddress.unit || "");
  const [street, setStreet] = useState(shippingAddress.address || "");
  const [suburb, setSuburb] = useState(shippingAddress.city || "");

  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const country = "Australia";
  const state = "NSW";

  const [isformValid, setFormValid] = useState(false);
  const shippingObjValue = { unit, street, suburb, postalCode, state, country };
  //simple check to make button disable and fill all the input
  useEffect(() => {
    const allInputFilled = street.length > 0 && suburb.length > 0;

    if (allInputFilled) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [street, suburb, postalCode, state]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (e.target.value === "skip") {
      navigate("/payment");
    } else {
      dispatch(shippingObject(shippingObjValue));
      navigate("/payment");
    }
  };
  // //goggle auto complete form
  // const googleAddress = (place) => {
  //   console.log(place);
  // };
  return (
    <Wraper>
      <div>
        <h2 className="text-center">Shipping page</h2>;
        <form className="shippingForm">
          <p className="fs-2 text-warning">
            At the moment, we are not doing home delivery, You may use{" "}
            <strong>
              <a href="https://www.doordash.com/en-AU/store/darwich-meats-&-co-greenacre-24510938">
                DoorDash
              </a>
            </strong>{" "}
            for home delivery. Sorry for inconvience.
          </p>
          <p>You may skip shipping form for pick-up at store.</p>
          <button
            onClick={submitHandler}
            className="btn btn-success p-3 btn-lg fs-3"
            value="skip"
          >
            Skip & Continue.
          </button>
          {/* <AutoComplete
            className="mb-5"
            placeholder="search for the places to speed up the filling proccess"
            apiKey={process.env.REACT_APP_GOOGLE_MAP_ID}
            onPlaceSelected={googleAddress}
          />*/}
          <div>
            <label htmlFor="unit">Unit</label>
            <input
              autoFocus
              required
              type="text"
              id="unit"
              name="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="street">Street Name</label>
            <input
              required
              type="text"
              id="street"
              name="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="suburb">Suburb Name</label>
            <input
              required
              type="text"
              id="suburb"
              name="suburb"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="state">State Name</label>
            <input type="text" id="state" name="state" defaultValue="NSW" />
          </div>
          <div>
            <label htmlFor="postalCode">PostalCode</label>
            <input
              required
              type="number"
              min="1000"
              max="4000"
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
              defaultValue="Australia"
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
