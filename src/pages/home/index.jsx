import React, { useEffect, useState } from "react";
import ProductCard from "../../components/product";
import Banner from "../../components/banner/banner";
import { Container, Row, Col } from "react-bootstrap";
import { url } from "../../utils/constants";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";

export default function Home() {
  const { cart, products, fetchProducts, clearCart, isLoading, hasErrors } =
    useCart();

  useEffect(() => {
    fetchProducts(url);
  }, [fetchProducts]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasErrors) {
    return <div>Error: {hasErrors.message}</div>;
  }

  return (
    <div>
      <Banner />
      <div>
        <button onClick={clearCart}>CLEAR</button>
        Cart:
        <div>
          {cart.map((product) => (
            <div>{product}</div>
          ))}
        </div>
      </div>
      <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery.length > 0 && (
        <div>
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                {product.title} {product.price}
              </Link>
            </div>
          ))}
        </div>
      )}
      <Container>
        <Col xs={12} md={12} lg={12}>
          <Row className="d-flex justify-content-center">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Row>
        </Col>
      </Container>
    </div>
  );
}
