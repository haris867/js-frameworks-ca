import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart.jsx";
import * as S from "./index.styled.jsx";

function ProductCard({ product }) {
  const { addToCart, removeFromCart } = useCart();
  function addToCartClick(event, id) {
    event.preventDefault();
    addToCart(id);
  }
  function removeFromCartClick(event, id) {
    event.preventDefault();
    removeFromCart(id);
  }
  return (
    <Link to={`/products/${product.id}`}>
      <Card
        className="m-4 col-sm-2"
        data-id={product.id}
        style={{ width: "18rem", height: "35rem" }}
      >
        <Card.Img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            padding: "10px",
          }}
          variant="top"
          src={product.imageUrl}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <S.Price isValid={product.price === product.discountedPrice}>
            {product.price}
          </S.Price>
          <Card.Text>
            {product.discountedPrice < product.price && product.discountedPrice}
          </Card.Text>
          <Button className="me-3">VIEW</Button>
          <Button onClick={(event) => addToCartClick(event, product.id)}>
            ADD TO CART
          </Button>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ProductCard;
