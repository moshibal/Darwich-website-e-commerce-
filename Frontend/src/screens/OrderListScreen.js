import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Utility/Message";
import Loader from "../components/Utility/Loader";
import Wraper from "../components/Utility/Wraper";
import { useNavigate } from "react-router-dom";
import { fetchAllOrders } from "../store/my-order-slice";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderlist = useSelector((state) => state.orderLists);
  const { orders, loading, error } = orderlist;
  console.log(orders);
  const {
    userInfo: { data },
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (data && data?.isAdmin) {
      dispatch(fetchAllOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, data]);

  return (
    <>
      <Wraper>
        <h1>Orders</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Wraper>
    </>
  );
};

export default OrderListScreen;
