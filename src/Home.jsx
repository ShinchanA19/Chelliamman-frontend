import { useNavigate } from "react-router-dom";

const categories = [
  "biscuts",
  "dhall",
  "masala",
  "oil",
  "snacks",
  "spices"
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 fw-bold">
        🏪 Chellai Amman Store
      </h1>

      <div className="row g-3">
        {categories.map(cat => (
          <div key={cat} className="col-6 col-md-4 col-lg-3">
            <button
              className="btn btn-success w-100 py-3 text-uppercase"
              onClick={() => navigate(`/products/${cat}`)}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
