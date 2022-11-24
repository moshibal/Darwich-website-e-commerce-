import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  //fechting product with id.
  useEffect(() => {
    try {
      const fetchProduct = async () => {
        const response = await axios.get(
          `http://localhost:4000/products/${productId}`
        );

        if (response.status === 200) {
          setProduct(response.data);
        }
      };
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  }, [productId]);
  //adding to cart
  const addToCart = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/products">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.imageUri} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>$ {product.price} per kilo</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>{product.description}</h3>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>$ {product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.availabitity ? "available" : "Not available"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.availabitity && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity in kilograms:</Col>
                    <Col>
                      <input
                        type="number"
                        onChange={(e) => setQty(e.target.value)}
                        style={{ maxWidth: "100%" }}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <Button
                size="lg"
                variant="dark"
                className="btn-block"
                type="button"
                disabled={product.availabitity === false}
                onClick={addToCart}
              >
                Add To Cart
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
