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
import styles from "../components/Product/Product.module.css";

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
    !userInfo?.data ? navigate("/login") : navigate("/shipping");
  };
  //fix the problem of coditional calculation
  const priceReduceFn = (accumulator, currentValue) => {
    if (currentValue.specialPrice) {
      return accumulator + currentValue.specialPrice * currentValue.qty;
    } else {
      return accumulator + currentValue.price * currentValue.qty;
    }
  };
  return (
    <Wraper>
      <Row>
        <Col md={9}>
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
                      <Link to={`/products/${item.id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      {item.specialPrice ? (
                        <p>${item.specialPrice}</p>
                      ) : (
                        <p>${item.price}</p>
                      )}
                    </Col>
                    <Col md={6}>
                      <div>
                        <label htmlFor={item.name}>
                          Quantity in kilograms:
                        </label>
                        <input
                          className={styles.productInputField}
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
                        className="btn btn-success ms-5 p-3"
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
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                    kilograms
                  </h2>{" "}
                  $
                  {cartItems
                    .reduce(priceReduceFn, 0)

                    .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item className="d-grid ">
                  <Button
                    type="button"
                    className=" btn-success fs-3 p-3 btn "
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
