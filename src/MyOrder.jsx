import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "https://backend-chan-production.up.railway.app";

function MyOrder() {
  const [order, setOrder] = useState(null);

  const orderId = localStorage.getItem("myOrderId");

  useEffect(() => {
    if (!orderId) return;

    axios
      .get(`${API_URL}/api/order/${orderId}`)
      .then(res => setOrder(res.data))
      .catch(err => console.error("API ERROR:", err));
  }, [orderId]);

  const updateQty = (index, qty) => {
    if (qty < 1) return;
    const updated = { ...order };
    updated.items[index].qty = qty;
    setOrder(updated);
  };

  const removeItem = (index) => {
    const updated = { ...order };
    updated.items.splice(index, 1);
    setOrder(updated);
  };

  const saveChanges = async () => {
    try {
      await axios.put(`${API_URL}/api/order/${order._id}`, { items: order.items });
      alert("Order updated");
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Failed to update order");
    }
  };

  if (!order) return <p className="text-center mt-5">Loading order...</p>;

  return (
    <div className="container mt-4">
      <h2>🧾 My Order</h2>

      {order.items.map((item, idx) => (
        <div
          key={idx}
          className="d-flex justify-content-between align-items-center mb-2"
        >
          <strong>{item.name}</strong>

          <div>
            <button onClick={() => updateQty(idx, item.qty - 1)}>-</button>
            <span className="mx-2">{item.qty}</span>
            <button onClick={() => updateQty(idx, item.qty + 1)}>+</button>
            <button
              className="btn btn-sm btn-danger ms-2"
              onClick={() => removeItem(idx)}
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <h4 className="mt-3">
        Total: ₹
        {order.items.reduce((sum, i) => sum + i.price * i.qty, 0)}
      </h4>

      <button
        className="btn btn-success w-100 mt-3"
        onClick={saveChanges}
      >
        💾 Save Changes
      </button>
    </div>
  );
}

export default MyOrder;
