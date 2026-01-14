import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h1 className="text-success">🎉 Order Placed Successfully!</h1>

      <p className="mt-3">
        Thank you for shopping at <strong>Chellai Amman Store</strong>.
      </p>

      <button
        className="btn btn-primary mt-4"
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSuccess;
