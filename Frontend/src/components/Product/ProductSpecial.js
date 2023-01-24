import React from "react";
import { useEffect } from "react";
import ProductCard from "./ProductCard.js";

import { Row, Col } from "react-bootstrap";
import Wrapper from "../Utility/Wraper";
import Message from "../Utility/Message.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecialproduct } from "../../store/specialProduct-slice.js";
const ProductSpecial = () => {
  const dispatch = useDispatch();

  const { message, products } = useSelector((state) => state.specialProduct);

  useEffect(() => {
    dispatch(fetchSpecialproduct());
  }, [dispatch]);
  return (
    <Wrapper>
      {message && <Message>{message}</Message>}
      <Row>
        {products.map((item) => {
          return (
            <Col sm={6} md={4} lg={3} key={item.name}>
              <ProductCard
                key={item.name}
                name={item.name}
                price={item.price}
                specialPrice={item.specialPrice}
                availabity={item.availabitity}
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
