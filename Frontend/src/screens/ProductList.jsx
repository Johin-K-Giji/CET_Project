import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animalType, setAnimalType] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/get-products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filter and sort products
  const filteredProducts = products
    .filter((product) => animalType === "" || product.animalType === animalType)
    .sort((a, b) => {
      if (sortOrder === "low-to-high") return a.productPrice - b.productPrice;
      if (sortOrder === "high-to-low") return b.productPrice - a.productPrice;
      return 0;
    });

  // ✅ Handle purchase
  const handlePurchase = async (product) => {
    const userId = sessionStorage.getItem("userId");
  
    if (!userId) {
      alert("Please log in to continue.");
      navigate("/login");
      return;
    }
  
    const payload = {
      userId,
      products: [
        {
          productId: product._id,
          productName: product.productName,
          price: product.productPrice,
        },
      ],
      totalPrice: product.productPrice,
    };
  
    try {
      const response = await axios.post("http://localhost:5000/api/purchase", payload);
      console.log("Purchase successful:", response.data);
  
      alert("Purchase successful!");
  
      // ✅ Pass product data to checkout page
      navigate("/checkout", { state: { products: payload.products, totalPrice: payload.totalPrice } });
    } catch (error) {
      console.error("Failed to complete purchase:", error.response?.data || error.message);
      alert("Failed to complete purchase. Try again.");
    }
  };
  

  if (loading) {
    return <div className="text-center mt-20">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar />

      {/* ✅ Page Heading */}
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 relative after:content-[''] after:block after:w-24 after:h-1 after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 after:mx-auto after:mt-2">
        Our Products
      </h2>

      {/* ✅ Filter Section */}
      <div className="flex justify-end mb-6 gap-4">
        {/* Animal Type Filter */}
        <div>
          <label className="block mb-2 font-medium text-gray-600">Animal Type</label>
          <select
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
            className="w-36 p-2 border rounded-md text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">All</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
          </select>
        </div>

        {/* Sort Order Filter */}
        <div>
          <label className="block mb-2 font-medium text-gray-600">Sort by Price</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-36 p-2 border rounded-md text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Default</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>
      </div>

      {/* ✅ Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 w-full max-w-[250px]"
          >
            <div className="h-40">
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-md font-semibold text-gray-800 truncate">
                {product.productName}
              </h3>
              <p className="text-sm text-gray-600 mt-1 truncate">
                {product.description}
              </p>
              <p className="text-md font-bold text-orange-500 mt-1">
                ₹{product.productPrice}
              </p>
              <button
                onClick={() => handlePurchase(product)}
                className="mt-3 w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:from-orange-500 hover:to-orange-600 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
