import React from "react";

import Card from "react-bootstrap/Card";
import styles from "./Product.module.css";

const ProductCard = ({
  name,
  price,
  imageUri,
  availabity,
  description,
  _id,
}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/products/${_id}`}>
        <Card.Img className={styles.image} variant="top" src={imageUri} />
      </a>
      <Card.Body>
        <a href={`/products/${_id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
          <Card.Subtitle>$ {price}</Card.Subtitle>
        </a>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
