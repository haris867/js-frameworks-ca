import useApi from "../../hooks/api";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { url } from "../../utils/constants";
import { useCart } from "../../hooks/useCart";

export default function SingleProduct() {
  let { id } = useParams();
  const [data, isLoading, error] = useApi(url + `${id}`);

  const { cart, addToCart, removeFromCart } = useCart();
  function addToCartClick(event, id) {
    event.preventDefault();
    addToCart(id);
  }
  function removeFromCartClick(event, id) {
    event.preventDefault();
    removeFromCart(id);
  }

  console.log(cart);
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const inCart = cart.some((item) => item === data.id);

  return (
    <div className="product-page product-container mx-auto mb-6">
      <div className="d-flex justify-content-center my-3">
        <img src={data.imageUrl} alt={data.title} />
      </div>
      <div className="">
        <div className="d-flex justify-content-between">
          <div>{data.title}</div>
          <div>{data.price}</div>
        </div>
        <div>
          <Button onClick={(event) => addToCartClick(event, data.id)}>
            ADD TO CART
          </Button>
          {inCart && (
            <Button onClick={(event) => removeFromCartClick(event, data.id)}>
              REMOVE FROM CART
            </Button>
          )}
        </div>
        <div className="d-flex justify-content-center mt-4">
          Description {data.description}
        </div>
        <div className="d-flex justify-content-center mt-4">
          Rating: {data.rating}
        </div>
        <div className="my-4">
          REVIEWS
          {data.reviews &&
            data.reviews.map((review) => (
              <div key={review.id}>
                <div>{review.username}</div>
                <div>{review.rating}</div>
                <div>{review.description}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
