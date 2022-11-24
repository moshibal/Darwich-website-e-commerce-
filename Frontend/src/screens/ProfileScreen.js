import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Table, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { getUserDetails, updateProfile } from "../store/user-detail";
import { listMyOrders } from "../store/my-order-slice";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Utility/Message";
import Loader from "../components/Utility/Loader";
import Wraper from "../components/Utility/Wraper";
import { Link } from "react-router-dom";

function ProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userInfo: { data },
  } = useSelector((state) => state.user);

  const { userDetails } = useSelector((state) => state.userDetails);
  const {
    orders,
    loading: orderListLoading,
    error: orderListError,
  } = useSelector((state) => state.myOrderList);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!data) {
      navigate("/login");
    } else {
      if (!userDetails) {
        dispatch(getUserDetails());
        dispatch(listMyOrders());
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
      }
    }
  }, [data, userDetails, navigate, dispatch]);
  const updateHandler = (e) => {
    e.preventDefault();

    const updatingProfile = { name, email };
    const updatingPassword = {
      oldPassword: password,
      newPassword,
      passwordConfirm,
    };
    dispatch(updateProfile(updatingProfile));
    if (newPassword !== passwordConfirm) {
      setMessage("The password doesnot match,please type same password.");
    }
    if (newPassword && newPassword === passwordConfirm) {
      //dispatch the action for updating password
      dispatch(updateProfile(updatingPassword));
    }
  };
  return (
    <Wraper>
      <Container>
        <Row>
          <Col>
            <Form>
              <h2>User Profile</h2>
              {/* {success && (
              <Message variant="primary">
                <h2>Updated</h2>
              </Message>
            )} */}
              {message && <Message variant="danger">{message}</Message>}
              <div>
                <label htmlFor="name">UserName</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <h2>Change Password</h2>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="newpassword">New Password</label>
                <input
                  type="password"
                  id="newpassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="passwordCon">Confirm Password</label>
                <input
                  type="password"
                  id="passwordCon"
                  name="confirmPassword"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
              <Button type="submit" variant="primary" onClick={updateHandler}>
                Update
              </Button>
            </Form>
          </Col>
          <Col>
            <h2>My orders</h2>
            {orderListLoading ? (
              <Loader />
            ) : orderListError ? (
              <Message variant="danger">{orderListError}</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>
                        {order.paymentResult.update_time.substring(0, 10)}
                      </td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paymentResult.update_time.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`}>
                          <Button className="btn-sm" variant="light">
                            Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </Wraper>
  );
}

export default ProfileScreen;
