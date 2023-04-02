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
      <h1>{data.title}</h1>

      <div className="d-flex justify-content-center my-3">
        <img src={data.imageUrl} alt={data.title} />
      </div>
      <div className="">
        <div className="d-flex justify-content-between">
          <div>
            <Button
              className="mb-2"
              onClick={(event) => addToCartClick(event, data.id)}
            >
              ADD TO CART
            </Button>
            {inCart && (
              <Button onClick={(event) => removeFromCartClick(event, data.id)}>
                REMOVE FROM CART
              </Button>
            )}
          </div>
          {data.discountedPrice < data.price ? (
            <div>
              <div
                style={{ color: "red" }}
                className="text-decoration-line-through me-2"
              >
                KR. {data.price}
              </div>
              <div>KR. {data.discountedPrice}</div>
            </div>
          ) : (
            <div>KR. {data.price}</div>
          )}
        </div>

        <div className="d-flex justify-content-center mt-4">
          <h3>Description</h3>
        </div>
        <div
          style={{ border: "solid 1px black", padding: "10px" }}
          className="d-flex justify-content-center mt-4"
        >
          {data.description}
        </div>

        <div className="d-flex mt-4">
          {" "}
          <h4>Rating: {data.rating}</h4>
        </div>
        <div className="my-4">
          <h4>REVIEWS</h4>
          {data.reviews &&
            data.reviews.map((review) => (
              <div
                style={{ border: "1px solid black", padding: "10px" }}
                key={review.id}
              >
                <h6>{review.username}</h6>
                <div>Rating: {review.rating}</div>
                <div>{review.description}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
