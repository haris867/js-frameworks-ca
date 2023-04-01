import { useCart } from "../../hooks/useCart";

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
    return <div>Cart is empty</div>;
  }

  const totalPrice = productsInCartWithQuantity
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);

  return (
    <div>
      <button onClick={clearCart}>CLEAR CART</button>
      Cart:
      {productsInCartWithQuantity.map((product) => {
        return (
          <div>
            {product.title} - {product.quantity} -{" "}
            {product.price * product.quantity}
          </div>
        );
      })}
      Total Price: {totalPrice}
    </div>
  );
}
