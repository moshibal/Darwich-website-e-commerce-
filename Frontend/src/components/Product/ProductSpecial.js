import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.js";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Wrapper from "../Utility/Wraper";
const ProductSpecial = () => {
  const [specialProducts, setSpecialProducts] = useState([]);

  useEffect(() => {
    try {
      const fetchSpecialProducts = async () => {
        const response = await axios.get(
          "http://localhost:4000/products/special"
        );
        if (response.status === 200) {
          setSpecialProducts(response.data);
        }
      };
      fetchSpecialProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Wrapper>
      <Row>
        {specialProducts.map((item) => {
          return (
            <Col sm={6} md={4} lg={3} key={item.name}>
              <ProductCard
                key={item.name}
                name={item.name}
                price={item.price}
                specialPrice={item.specialPrice}
                availabity={item.availabity}
                imageUri={item.imageUri}
                description={item.description}
              />
            </Col>
          );
        })}
      </Row>
    </Wrapper>
  );
};

export default ProductSpecial;
