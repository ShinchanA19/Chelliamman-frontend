import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import Cart from "./Cart";
import OrderSuccess from "./OrderSuccess";
import MyOrder from "./MyOrder";
import AdminOrders from "./AdminOrders"; // 👈 ADD THIS

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my-order" element={<MyOrder />} />


        {/* 🔐 ADMIN PAGE */}
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
