import React, { useEffect } from "react";

import ProductCard from "./ProductCard";
import Paginate from "../Utility/Paginate";
import Loader from "../Utility/Loader";
import Message from "../Utility/Message";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../store/product-slice";
import SearchBox from "../Utility/SearchBox";
import styles from "./Product.module.css";

const Product = () => {
  const { keyword } = useParams();
  const pageNumber = useParams().pageNumber || 1;
  const dispatch = useDispatch();
  const {
    products,
    loading,
    message,
    pageNumber: page,
    pages,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <div className={styles.searchMain}>
        <div className={styles.searchBoxDiv}>
          <SearchBox />
        </div>
      </div>

      <h1>All the products</h1>
      {loading ? (
        <Loader />
      ) : message ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <>
          <Row>
            {products.map((item) => (
              <Col sm={6} md={4} lg={3} key={item.name}>
                <ProductCard
                  _id={item._id}
                  name={item.name}
                  price={item.price}
                  specialPrice={item.specialPrice}
                  availabity={item.availabitity}
                  imageUri={item.imageUri}
                  description={item.description}
                />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} />
        </>
      )}
    </>
  );
};

export default Product;
