import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import vedio from "../../assets/Grilled steak.mp4";
import styles from "./Main.module.css";

const Main = () => {
  const [specialProducts, setSpecialProduct] = useState([]);
  const fetchSpecialProduct = async () => {
    const response = await axios.get("http://localhost:4000/products/special");
    if (response.status === 200) {
      setSpecialProduct(response.data);
    }
  };

  useEffect(() => {
    fetchSpecialProduct();
    try {
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
          <h2>OUR PROMISE</h2>
          <h3>NO PRESERVATIVES</h3>
          <h3>NO HORMONES</h3>
          <h3>GRASS FED BEEF & LAMB</h3>
          <div>
            <div>
              <Link to="/products/special">Today's Sepecial</Link>
            </div>
            <div>
              <Link to="/products">Products List</Link>
            </div>
            <div>
              <Link to="/products/available">Available Products</Link>
            </div>
          </div>
          {/* conditionally rendering the special products */}
          {specialProducts.length >= 1 && (
            <div className={styles.special}>
              <h2>HEY, WE GOT SPECIALS TODAY.</h2>
              {specialProducts.map((item) => (
                <>
                  <h3>
                    {item.product.name}{" "}
                    <span>normally {item.product.price} per kilo.</span>
                  </h3>
                  <p>{item.message}</p>
                </>
              ))}
              <Link to="/products/special">Check Out All Specials</Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;
