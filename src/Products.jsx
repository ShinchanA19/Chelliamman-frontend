import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart, getCartCount } from "./cartUtils";

// ✅ Railway Backend URL
const API_URL = "https://backend-chan-production.up.railway.app";

function Products() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertProduct, setAlertProduct] = useState("");
  const [cartCount, setCartCount] = useState(0);

  // ✅ Fetch products
  useEffect(() => {
    axios
      .get(`${API_URL}/api/${category}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("API ERROR:", err));

    setCartCount(getCartCount());
  }, [category]);

  // ✅ Sync cart count across tabs
  useEffect(() => {
    const syncCart = () => setCartCount(getCartCount());
    window.addEventListener("storage", syncCart);

    return () => window.removeEventListener("storage", syncCart);
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    setAlertProduct(product.name);
    setShowAlert(true);
    setCartCount(getCartCount());

    setTimeout(() => setShowAlert(false), 2000);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        <button
          className="btn btn-primary position-relative"
          onClick={() => navigate("/cart")}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <h2 className="text-center text-uppercase mb-3">
        {category} Products
      </h2>

      {showAlert && (
        <div className="alert alert-success text-center">
          ✅ <strong>{alertProduct}</strong> added to cart
        </div>
      )}

      <input
        className="form-control mb-4"
        placeholder="Search product..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="row g-4">
        {filteredProducts.map((p, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5>{p.brand}</h5>
                <p className="fw-bold text-success">₹ {p.price}</p>
                <p className="fw-bold text-success">{p.name}</p>

                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleAddToCart(p)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
