import React, { useState, useEffect } from "react";
import axios from "axios";

import ProductCard from "./ProductCard";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const fetchProducts = async () => {
    const results = await axios.get("http://localhost:4000/products");

    if (results.status === 200) {
      setProductList(results.data);
    }
  };
  useEffect(() => {
    try {
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      {productList.map((item, idex) => (
        <ProductCard
          key={item.name}
          name={item.name}
          price={item.price}
          availabity={item.availabity}
          imageUri={item.imageUri}
        />
      ))}
    </div>
  );
};

export default Product;
