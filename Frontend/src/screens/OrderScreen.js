import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Utility/Loader";

import Message from "../components/Utility/Message";

import { fetchOrder } from "../store/orderDetails-slice.js";
import { orderPayReset, payOrder } from "../store/order-pay-slice.js";
const OrderScreen = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  //checking the order
  const {
    loading,
    orderDetails: { order },
    error,
  } = useSelector((state) => state.orderDetail);

  //state for successful pay
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );
  console.log("order", order);
  console.log("successpay", successPay);

  //states

  useEffect(() => {
    const addPayPalScript = async () => {
      //fetching the client id
      const {
        data: { clientID },
      } = await axios.get("http://localhost:4000/api/config/paypal");
      //creating the script to add the javascript sdk
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
      script.onload = () => {
        setSdkReady(true);
      };
      //adding the script to the app.
      document.body.appendChild(script);
    };
    //condition to fecth the order first
    if (!order || successPay) {
      dispatch(fetchOrder(orderId));
      dispatch(orderPayReset());
    } else if (!order.ispaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [orderId, order, dispatch, successPay]);
  const successPaymentHandler = (paypalResult) => {
    dispatch(payOrder(orderId, paypalResult));
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
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
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
              <Link to={"/products"} className="btn btn-block btn-dark">
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
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
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
