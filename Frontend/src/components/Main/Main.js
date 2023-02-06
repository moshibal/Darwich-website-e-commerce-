import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import vedio from "../../assets/Grilled steak.mp4";
import { fetchSpecialproduct } from "../../store/specialProduct-slice";
import styles from "./Main.module.css";

const Main = () => {
  const dispatch = useDispatch();
  //subscription to the special product
  const [singleProduct, setSingleProduct] = useState({});
  const { products } = useSelector((state) => state.specialProduct);
  useEffect(() => {
    products.length > 0 && setSingleProduct(products[0]);
  }, [products]);
  useEffect(() => {
    dispatch(fetchSpecialproduct());
  }, [dispatch]);
  return (
    <main className={styles.mainDiv}>
      <div className={styles.bgVedio}>
        <video autoPlay loop muted className={styles.bgVedioContent}>
          <source src={vedio} />

          <p>
            Your browser doesn't support HTML video. Here is a
            <a href="rabbit320.mp4">link to the video</a> instead.
          </p>
        </video>
      </div>

      <div className={styles.content}>
        <div className={styles.promiseText}>
          <div className={styles.textDiv}>
            <h2>OUR PROMISE</h2>
            <h3>NO PRESERVATIVES,</h3>
            <h3>NO HORMONES,</h3>
            <h3>GRASS FED BEEF & LAMB & CHICKEN</h3>
          </div>
          <div className={styles.buttonMargin}>
            <div>
              <Link to="/products">
                <h3>Check All Products &#8594;</h3>
              </Link>
            </div>
          </div>

          {/* conditionally rendering the special products */}
          {products.length >= 1 && (
            <div className={styles.special}>
              <div>
                <h3>Yuppie, WE GOT SPECIALS TODAY.</h3>

                <div key={singleProduct.name}>
                  <h4>
                    {singleProduct.name} normally $ {singleProduct.price} per
                    kilo. Today $ {singleProduct.specialPrice} only🥳
                  </h4>
                </div>

                <Link to="/products/special">
                  <h3>Check Out All Specials &#8594;</h3>
                </Link>

                <div />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;
