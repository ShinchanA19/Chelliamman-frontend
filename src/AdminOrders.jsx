import axios from "axios";
import { useEffect, useState } from "react";

// Replace this with your deployed Railway backend URL
const API_URL = "https://backend-chan-production.up.railway.app";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/orders`) // ✅ updated backend URL
      .then(res => setOrders(res.data))
      .catch(err => console.error("API ERROR:", err));
  }, []);

  const printOrder = (order) => {
    const printContent = `
Chellai Amman Store
--------------------
${order.items
  .map(i => `${i.name} x ${i.qty} = ₹${i.price * i.qty}`)
  .join("\n")}
--------------------
Total: ₹${order.total}
`;

    const win = window.open("", "", "width=300,height=600");

    win.document.write(`
      <html>
        <head>
          <title>Print Bill</title>
          <style>
            body {
              font-family: monospace;
              white-space: pre;
              font-size: 14px;
              margin: 10px;
            }
          </style>
        </head>
        <body>
${printContent}
        </body>
      </html>
    `);

    win.document.close();
    win.focus();

    // ✅ Print first
    win.print();

    // ✅ Close ONLY after printing
    win.onafterprint = () => {
      win.close();
    };
  };

  return (
    <div className="container mt-4">
      <h2>📋 Admin Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map(order => (
        <div key={order._id} className="card p-3 mb-3">
          <p>
            <b>Date:</b>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          {order.items.map((i, idx) => (
            <p key={idx}>
              {i.name} × {i.qty} = ₹{i.price * i.qty}
            </p>
          ))}

          <h5>Total: ₹{order.total}</h5>

          <button
            className="btn btn-primary mt-2"
            onClick={() => printOrder(order)}
          >
            🖨 Print Bill
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
