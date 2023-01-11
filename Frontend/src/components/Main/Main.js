import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import vedio from "../../assets/Grilled steak.mp4";
import styles from "./Main.module.css";

const Main = () => {
  const [specialProducts, setSpecialProduct] = useState([]);

  useEffect(() => {
    try {
      const fetchSpecialProduct = async () => {
        const response = await axios.get(
          "http://localhost:4000/products/special"
        );

        if (response.status === 200) {
          console.log(response.data);
          setSpecialProduct(response.data);
        }
      };
      fetchSpecialProduct();
    } catch (error) {
      console.log(error);
    }
  }, []);
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
            <div className="w3-btn w3-round-xxlarge w3-hover-green w3-yellow w3-padding-large w3-text-large">
              <Link to="/products">
                <h3>Check All Products &#8594;</h3>
              </Link>
            </div>
          </div>
          {/* conditionally rendering the special products */}
          {specialProducts.length >= 1 && (
            <div className={styles.special}>
              <div className="w3-panel w3-green w3-hover-yellow">
                <h2>Yuppie, WE GOT SPECIALS TODAY.</h2>
                {specialProducts.map((item) => (
                  <div key={item.name}>
                    <h3>
                      {item.name} normally $ {item.price} per kilo. Today ${" "}
                      {item.specialPrice} only🥳
                    </h3>
                  </div>
                ))}

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
