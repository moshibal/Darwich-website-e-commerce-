import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.js";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
const ProductAvailable = () => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const fetchAvailableProducts = async () => {
    const response = await axios.get("http:/api/products/available");
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
      <Row>
        {availableProducts.map((item) => {
          return (
            <Col sm={6} md={4} lg={3} key={item.name}>
              <ProductCard
                key={item.name}
                name={item.name}
                price={item.price}
                availabity={item.availabity}
                imageUri={item.imageUri}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ProductAvailable;
