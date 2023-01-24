// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Utility/Loader";
import Message from "../components/Utility/Message";
// import PaypayButtonWraper from "../components/Utility/PaypayButtonWraper";

import { fetchOrder } from "../store/orderDetails-slice.js";

import {
  deliverOrder,
  orderDeliverReset,
  orderPayReset,
} from "../store/order-pay-slice.js";

//fetching the client id

const OrderScreen = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();

  //user Info
  const {
    userInfo: { data },
  } = useSelector((state) => state.user);
  //checking the order
  const {
    loading,
    orderDetails: { order },
    error,
  } = useSelector((state) => state.orderDetail);

  // //state for successful pay
  // const { loading: loadingPay, success: successPay } = useSelector(
  //   (state) => state.orderPay
  // );

  //state for successful deliver
  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    (state) => state.orderDeliver
  );

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
    //condition to fecth the order first
    if (orderId || successDeliver) {
      dispatch(orderDeliverReset());
      dispatch(orderPayReset());
      dispatch(fetchOrder(orderId));
    }
  }, [orderId, dispatch, navigate, successDeliver, data]);

  // const successPaymentHandler = (paypalResult) => {
  //   dispatch(payOrder(orderId, paypalResult));
  // };
  const deliverHandler = () => {
    dispatch(deliverOrder(orderId));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Shipping</h2>
              {order.shippingAddress &&
              order.shippingAddress?.suburb.length > 0 ? (
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
              ) : (
                <p>Pick up at store. See you soon.</p>
              )}

              {!order.isDelivered ? (
                <Message variant="danger">Not Delivered Yet.</Message>
              ) : (
                <Message>Already Delivered.</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {order.paymentMethod}
              {!order.isPaid ? (
                <Message variant="danger">Not Paid Yet.</Message>
              ) : (
                <Message>Paid.</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty.</Message>
              ) : (
                <ListGroup>
                  {order.orderItems.map((item, index) => (
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
                          {item.qty} * {item.price} = ${item.qty * item.price}
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
                SEE ALL PRODUCTS
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
                  <Col>Shipping Price</Col>
                  <Col>${order.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="fs-3 text-primary">
                    Price for pick-up at store
                  </Col>
                  <Col className="border-left">
                    ${order.totalPrice - order.taxPrice - order.shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              {/* {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {
                    <PayPalScriptProvider
                      options={{
                        "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
                        currency: "AUD",
                      }}
                    >
                      <PaypayButtonWraper
                        value={order.totalPrice}
                        successPaymentHandler={successPaymentHandler}
                      />
                    </PayPalScriptProvider>
                  }
                </ListGroup.Item>
              )} */}
              {loadingDeliver && <Loader />}
              {data && data.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
