import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/Utility/checkoutStep";
import Message from "../components/Utility/Message";
import { resetCartAction } from "../store/cart-slice";
import { createOrder } from "../store/order-slice";
const FinalPaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //states
  const carts = useSelector((state) => state.cart.cartLists);
  const { shippingAddress } = useSelector((state) => state.shipping);
  const paymentMethod = useSelector((state) => state.payment.paymentmethod);
  const { success, orderidObject, error } = useSelector((state) => state.order);

  //calculate prices
  const totalItemPrice = carts.reduce(
    (acc, item) =>
      acc + item.specialPrice ? item.specialPrice : item.price * item.qty,
    0
  );
  const shippingPrice = Number(totalItemPrice > 100 ? 0 : 10);
  const taxPrice = Number((0.1 * totalItemPrice).toFixed(2));
  const totalPrice =
    Number(totalItemPrice) + Number(shippingPrice) + Number(taxPrice);
  useEffect(() => {
    if (success) {
      navigate(`/order/${orderidObject._id}`);
    }
  }, [success, navigate, orderidObject._id]);
  //placeorder handler
  const orderdetails = {
    orderItems: carts,
    shippingAddress,
    paymentMethod,
    itemsPrice: totalItemPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };

  const placeOrderHandler = () => {
    dispatch(createOrder(orderdetails));
    dispatch(resetCartAction());
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              {shippingAddress.suburb?.length > 0 ? (
                <p>
                  <strong>Address: </strong>
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
              ) : (
                <p>Pick up at store. See you soon.</p>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>order Items</h2>
              {carts.length === 0 ? (
                <Message>Your cart is empty.</Message>
              ) : (
                <ListGroup>
                  {carts.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.imageUri}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={2}>
                          <Link to={`/products/${item.id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} *{" "}
                          {item.specialPrice ? item.specialPrice : item.price} =
                          $
                          {item.qty * item.specialPrice
                            ? item.specialPrice
                            : item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <Link
                to={"/products"}
                className="btn btn-success p-3 btn-lg fs-4"
              >
                ADD MORE ITEMS
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items total</Col>
                  <Col>${totalItemPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>${shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="fs-3 text-primary">
                    Price for pick-up at store
                  </Col>
                  <Col className="border-left">
                    ${totalPrice - taxPrice - shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-success p-3 btn-lg fs-3"
                  disabled={carts.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FinalPaymentScreen;
