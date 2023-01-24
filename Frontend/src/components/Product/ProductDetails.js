import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { postReview } from "../../store/review-slice";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Utility/Message";
import styles from "./Product.module.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();
  //state from redux-toolkit
  const { error: errorReview, success: successReview } = useSelector(
    (state) => state.review
  );
  const { userInfo } = useSelector((state) => state.user);

  const [product, setProduct] = useState({});

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  //fechting product with id.
  useEffect(() => {
    try {
      const fetchProduct = async () => {
        const response = await axios.get(`/api/products/${productId}`);

        if (response.status === 200) {
          setProduct(response.data);
        }
      };
      if (successReview) {
        fetchProduct();
      } else {
        fetchProduct();
      }
    } catch (error) {}
  }, [productId, successReview]);
  //adding to cart
  const addToCart = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };
  const reviewHandler = (e) => {
    e.preventDefault();
    dispatch(postReview(productId, { rating, comment }));
    setComment("");
  };
  return (
    <>
      <Link className="btn btn-success p-2 fs-2 my-3" to="/products">
        Go Back
      </Link>
      {product.name && (
        <>
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
                  {product.specialPrice ? (
                    <h3>$ {product.specialPrice} per kilo</h3>
                  ) : (
                    <h3>$ {product.price} per kilo</h3>
                  )}
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
                        {product.specialPrice ? (
                          <strong>$ {product.specialPrice}</strong>
                        ) : (
                          <strong>$ {product.price}</strong>
                        )}
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
                            value={qty}
                            type="number"
                            onChange={(e) => setQty(e.target.value)}
                            className={styles.productInputField}
                          />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <Button
                    size="lg"
                    className="btn btn-success p-3 fs-3"
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

          <Row>
            {product && product.reviews?.length !== 0 ? (
              <h3 className="mb-5">
                Some of the reviews from our beautiful customers.{" "}
              </h3>
            ) : (
              ""
            )}
            {product && product.reviews?.length === 0 ? (
              <Message>No Reviews Yet</Message>
            ) : (
              product.reviews?.map((review) => (
                <ListGroup
                  key={review._id}
                  className="mb-3 border border-success flex"
                >
                  <ListGroup.Item>{review.name}</ListGroup.Item>
                  <ListGroup.Item>{review.rating}</ListGroup.Item>
                  <ListGroup.Item>{review.comment}</ListGroup.Item>
                </ListGroup>
              ))
            )}

            {errorReview && <Message variant="danger">{errorReview}</Message>}
            {userInfo.data?.name ? (
              <form>
                <h3>Post Your Review</h3>
                <div>
                  <label htmlFor="rating">Select the rating</label>
                  <select
                    id="rating"
                    name="ratings"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="1">1:poor</option>
                    <option value="2">2:fair</option>
                    <option value="3">3:good</option>
                    <option value="4">4:very good</option>
                    <option value="5">5:excellent</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="comment">
                    Feel Free To Give Your Opinion.🤗
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  onClick={reviewHandler}
                  className="btn btn-success p-3 fs-3"
                >
                  Post Review
                </Button>
              </form>
            ) : (
              <h3>Please login to give review.</h3>
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetails;
