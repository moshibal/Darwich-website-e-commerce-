import React, { useState } from "react";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Wraper from "../components/Utility/Wraper";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import { getUserById, updateUser } from "../store/userList-slice";
import { userUpdateReset } from "../store/userList-slice";

function UserEditScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { user } = useSelector((state) => state.userDetailsById);
  const { success: updateSuccess, error: updateError } = useSelector(
    (state) => state.userUpdate
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getUserById(userId));
      dispatch(userUpdateReset());
      navigate("/admin/userlist");
    } else {
      if (!user?.name || user?._id !== userId) {
        dispatch(getUserById(userId));
      } else {
        setName(user?.name || "");
        setEmail(user?.email || "");
        setIsAdmin(user?.isAdmin || false);
      }
    }
  }, [userId, dispatch, navigate, user, updateSuccess]);
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <Wraper>
      <Container>
        <Row>
          <Col>
            <Link to="/admin/userlist">Back to User Lists</Link>
            <h2>User Edit Profile</h2>
            {updateError?.length > 0 && updateError}
            <Form>
              <div>
                <label htmlFor="name">UserName</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="isAdmin">Is Admin</label>
                <input
                  type="checkbox"
                  id="isAdmin"
                  value={isAdmin}
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.value)}
                />
              </div>

              <Button type="submit" variant="primary" onClick={updateHandler}>
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Wraper>
  );
}

export default UserEditScreen;
