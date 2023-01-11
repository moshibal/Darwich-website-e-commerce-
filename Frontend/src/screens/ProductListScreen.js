import React, { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  createProduct,
  deleteProduct,
  fetchProducts,
} from "../store/product-slice";

import Message from "../components/Utility/Message";
import Loader from "../components/Utility/Loader";
import Wraper from "../components/Utility/Wraper";
import { useNavigate } from "react-router-dom";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, message } = useSelector((state) => state.product);
  const {
    loading: loadingDelete,
    success: successDelete,
    message: messageDelete,
  } = useSelector((state) => state.productDelete);
  const {
    loading: loadingCreate,
    success: successCreate,
    message: messageCreate,
    product: productCreate,
  } = useSelector((state) => state.productCreate);

  const {
    userInfo: { data },
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (!data?.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/productlist/${productCreate._id}/edit`);
    } else {
      dispatch(fetchProducts());
    }
  }, [
    dispatch,
    navigate,
    data,
    successDelete,
    successCreate,
    productCreate._id,
  ]);
  //delete handler
  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(productId));
    }
  };
  //create handler
  const productCreatehandler = () => {
    dispatch(createProduct());
  };
  return (
    <Wraper>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={productCreatehandler}>
            <i className="fas fas-plus"></i>CREATE PRODUCT
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {messageDelete && <Message variant="danger">{messageDelete}</Message>}
      {loadingCreate && <Loader />}
      {messageCreate && <Message variant="danger">{messageCreate}</Message>}
      {loading ? (
        <Loader />
      ) : message ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>Price</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <LinkContainer to={`/admin/productlist/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Wraper>
  );
};

export default ProductListScreen;
