import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.js";
import axios from "axios";
const ProductAvailable = () => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const fetchAvailableProducts = async () => {
    const response = await axios.get(
      "http://localhost:4000/products/available"
    );
    if (response.status === 200) {
      setAvailableProducts(response.data);
    }
  };
  useEffect(() => {
    try {
      fetchAvailableProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      {availableProducts.map((item) => {
        return (
          <ProductCard
            key={item.name}
            name={item.name}
            price={item.price}
            availabity={item.availabity}
            imageUri={item.imageUri}
          />
        );
      })}
    </div>
  );
};

export default ProductAvailable;
