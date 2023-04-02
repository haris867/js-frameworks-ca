import { useCart } from "../../hooks/useCart";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
  const { cart, products, clearCart } = useCart();

  const productsInCartWithQuantity = cart.reduce((cartArray, productId) => {
    const existingProduct = cartArray.find((item) => item.id === productId);
    const product = products.find(
      (currentProduct) => currentProduct.id === productId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartArray.push({ ...product, quantity: 1 });
    }
    return cartArray;
  }, []);

  if (cart.length === 0) {
    return (
      <div className="text-center">
        <div>Cart is empty</div>
        <div>
          <Link to={`/`}>Continue shopping</Link>
        </div>
      </div>
    );
  }

  const totalPrice = productsInCartWithQuantity
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>Cart:</div>
        <div>
          <Button onClick={clearCart}>CLEAR CART</Button>
        </div>
      </div>
      <div>
        {productsInCartWithQuantity.map((product) => {
          return (
            <div
              key={product.id}
              className="mb-3 d-flex align-items-center justify-content-between"
            >
              <div>
                <img
                  className="me-2"
                  src={product.imageUrl}
                  alt={product.title}
                />
                {product.title}
              </div>
              <div className="mx-3">{product.quantity}</div>
              <div>{(product.price * product.quantity).toFixed(2)}</div>
            </div>
          );
        })}
        Total Price: {totalPrice}
      </div>
      <Link to={`/checkout`}>
        <Button onClick={clearCart}>CHECKOUT</Button>
      </Link>
    </div>
  );
}
