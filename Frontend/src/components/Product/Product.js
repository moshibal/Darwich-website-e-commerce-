import React, { useEffect } from "react";

import ProductCard from "./ProductCard";
import Loader from "../Utility/Loader";
import Message from "../Utility/Message";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/product-slice";

const Product = () => {
  const dispatch = useDispatch();
  const { products, loading, message } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <h1>All the products</h1>
      {loading ? (
        <Loader />
      ) : message ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <Row>
          {products.map((item) => (
            <Col sm={6} md={4} lg={3} key={item.name}>
              <ProductCard
                _id={item._id}
                name={item.name}
                price={item.price}
                availabity={item.availabity}
                imageUri={item.imageUri}
                description={item.description}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Product;
