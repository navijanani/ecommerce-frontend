import { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerPage.css";

function CustomerPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      const productsWithCategoryId = res.data.map(product => ({
        ...product,
        category_id: product.category_id || product.category // Ensure category_id is set
      }));
      setProducts(productsWithCategoryId);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
    }
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category_id === selectedCategory);

  return (
    <div className="customer-page">
      <h2 className="customer-title">Customer Page</h2>

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-filter"
      >
        <option value="All">All</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-item">
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
              <h4 className="product-name">{product.name}</h4>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-description">{product.description}</p>
              <button
                onClick={() => deleteProduct(product._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No products available for this category.</p>
        )}
      </div>
      
    </div>
  );
}

export default CustomerPage;
