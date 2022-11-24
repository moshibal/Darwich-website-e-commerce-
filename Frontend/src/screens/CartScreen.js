import { useEffect } from "react";
import Wraper from "../components/Utility/Wraper";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartRequest, deleteItem } from "../store/cart-slice";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import Message from "../components/Utility/Message";
import styles from "../components/Cart.Module.css";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty"));
  const cartItems = useSelector((state) => state.cart.cartLists);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (productId) {
      dispatch(cartRequest(productId, qty));
    }
  }, [productId, qty, dispatch]);
  const handleCartChange = (qty, id) => {
    dispatch(cartRequest(id, qty));
  };
  const removeCartChange = (id) => {
    dispatch(deleteItem(id));
  };
  const checkoutHandler = (e) => {
    e.preventDefault();
    !userInfo ? navigate("/login") : navigate("/shipping");
  };
  return (
    <Wraper>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Nothing on the shopping cart.{" "}
              <Link to="/products">
                <i className="text-uppercase text-success border-bottom">
                  Check Products
                </i>
              </Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.imageUri}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={2}>
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={6}>
                      <div className={styles.inputDiv}>
                        <label htmlFor={item.name}>
                          Quantity in kilograms:
                        </label>
                        <input
                          id={item.name}
                          type="string"
                          value={item.qty}
                          onChange={(e) =>
                            handleCartChange(Number(e.target.value), item.id)
                          }
                        />
                      </div>
                      <Link variant="primary" to={"/products"}>
                        Shop more..
                      </Link>{" "}
                      <Button
                        variant="primary"
                        onClick={() => removeCartChange(item.id)}
                      >
                        Remove Item
                      </Button>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        {cartItems.length > 0 && (
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h2>{" "}
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        )}
      </Row>
    </Wraper>
  );
};

export default CartScreen;
