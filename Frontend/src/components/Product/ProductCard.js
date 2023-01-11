import React from "react";

import Card from "react-bootstrap/Card";
import styles from "./Product.module.css";

const ProductCard = ({
  name,
  price,
  imageUri,
  availabity,
  description,
  specialPrice,
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
          {specialPrice ? (
            <>
              <Card.Subtitle className={styles.lineThrough}>
                $ {price}
              </Card.Subtitle>
              <Card.Subtitle className="fs-4 font-weight-bold">
                <span>Special price $ {specialPrice} only.</span>
                <span className="ms-3 fs-3">
                  {availabity ? "In Stock" : "Out of Stock"}
                </span>
              </Card.Subtitle>
            </>
          ) : (
            <Card.Subtitle className="fs-4 font-weight-bold">
              <span>$ {price}</span>
              <span className="ms-3">
                {availabity ? "In Stock" : "Out of Stock"}
              </span>
            </Card.Subtitle>
          )}
        </a>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
