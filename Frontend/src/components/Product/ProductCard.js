import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCard = ({ name, price, imageUri, availabity }) => {
 
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageUri} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>$ {price}</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">More Details</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
