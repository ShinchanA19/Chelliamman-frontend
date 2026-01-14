import axios from "axios";
import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateQty } from "./cartUtils";
import { useNavigate } from "react-router-dom";

const API_URL = "https://backend-chan-production.up.railway.app"; // ✅ Your Railway backend

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // ✅ PLACE ORDER (NO WHATSAPP)
  const placeOrder = async () => {
    const cartData = getCart();

    if (cartData.length === 0) {
      alert("Cart is empty");
      return;
    }

    const total = cartData.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    try {
      // ✅ Save order in Railway MongoDB
      await axios.post(`${API_URL}/api/order`, {
        items: cartData,
        total
      });

      // ✅ Clear cart
      localStorage.removeItem("cart");
      setCart([]);

      // ✅ Go to success page
      navigate("/order-success");
    } catch (err) {
      console.error("ORDER ERROR:", err);
      alert("Order failed");
    }
  };

  useEffect(() => {
    setCart(getCart());
  }, []);

  const removeItem = (index) => {
    removeFromCart(index);
    setCart(getCart());
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="container mt-4">
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h2 className="text-center mb-4">🛒 Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Cart is empty</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.name}</strong><br />
                  ₹{item.price} × {item.qty}
                </div>

                <div>
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => {
                      if (item.qty > 1) {
                        updateQty(index, item.qty - 1);
                        setCart(getCart());
                      }
                    }}
                  >
                    −
                  </button>

                  <span className="mx-2">{item.qty}</span>

                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => {
                      updateQty(index, item.qty + 1);
                      setCart(getCart());
                    }}
                  >
                    +
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h4 className="text-end">Total: ₹ {total}</h4>

          <button
            className="btn btn-success w-100 mt-3"
            onClick={placeOrder}
          >
            ✅ Checkout & Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
