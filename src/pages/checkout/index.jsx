import { Link } from "react-router-dom";
export default function CheckOut() {
  return (
    <div className="text-center">
      <h1>Your order was successful</h1>
      <div>
        <Link to={`/`}>
          <h2>Continue shopping</h2>
        </Link>
      </div>
    </div>
  );
}
