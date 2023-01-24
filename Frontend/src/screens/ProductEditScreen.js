import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Wraper from "../components/Utility/Wraper";
import Loader from "../components/Utility/Loader";
import { Link } from "react-router-dom";
import {
  fetchProductById,
  productByIdReset,
  productUpdateReset,
  updateProduct,
} from "../store/product-slice";

function ProductEditScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  //subscription
  const { product } = useSelector((state) => state.productDetailsById);
  const { success: successUpdate } = useSelector(
    (state) => state.productUpdate
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [specialPrice, setSpecialPrice] = useState(0);
  const [image, setImage] = useState("");
  const [availability, setAvailability] = useState(true);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState("");
  console.log(availability);

  useEffect(() => {
    if (successUpdate) {
      dispatch(productUpdateReset());
      dispatch(productByIdReset());
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(fetchProductById(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setAvailability(product.availabitity);
        setSpecialPrice(product.specialPrice);
        setCategory(product.category);
        setDescription(product.description);
        setImage(product.imageUri);
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate]);
  const updateHandler = (e) => {
    e.preventDefault();
    //update product
    dispatch(
      updateProduct({
        _id: product._id,
        name,
        price,
        specialPrice,
        category,
        imageUri: image,
        availability,
        description,
      })
    );
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      const { data } = await axios.post(
        `/api/upload/${productId}`,
        formData,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <Wraper>
      <Container>
        <Row>
          <Col>
            <Link to="/admin/productlist">Back to Product Lists</Link>
            <h2>Product Edit Profile</h2>

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
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="specialPrice"> Special Price</label>
                <input
                  type="number"
                  id="specialPrice"
                  value={specialPrice}
                  onChange={(e) => setSpecialPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="availability">Availability</label>
                <input
                  checked={availability}
                  type="checkBox"
                  id="availability"
                  value={availability}
                  onChange={(e) =>
                    setAvailability((preValue) => {
                      return !preValue;
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={uploadFileHandler}
                />
              </div>
              {uploading && <Loader />}

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

export default ProductEditScreen;
