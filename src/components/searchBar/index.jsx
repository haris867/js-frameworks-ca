import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function SearchBar() {
  const { products } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <Container>
      <div className="mt-3">
        <div className="d-flex justify-content-center">
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center mt-3">
          {searchQuery.length > 0 && (
            <div className="searchResults">
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <div className="searchResult my-3">
                      <img src={product.imageUrl} alt={product.title} />
                      {product.title}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
