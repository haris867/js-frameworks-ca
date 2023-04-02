import React, { useEffect } from "react";
import ProductCard from "../../components/product";
import Banner from "../../components/banner/banner";
import { Container, Row, Col } from "react-bootstrap";
import { url } from "../../utils/constants";
import { useCart } from "../../hooks/useCart";
import SearchBar from "../../components/searchBar";

export default function Home() {
  const { products, fetchProducts, isLoading, hasErrors } = useCart();

  useEffect(() => {
    fetchProducts(url);
  }, [fetchProducts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasErrors) {
    return <div>Error: {hasErrors.message}</div>;
  }

  console.log(products);

  return (
    <div>
      <Banner />
      <SearchBar />
      <Container>
        <h1 className="text-center">Our products</h1>
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
