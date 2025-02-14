import { useState, useEffect } from "react";
import axios from "axios";
import "./MerchantPage.css";

function MerchantPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", image_url: "", category_id: "" });

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
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addCategory = async () => {
    if (categories.length >= 4) return alert("Only 4 categories allowed!");

    try {
      await axios.post("http://localhost:5000/api/categories", { name: newCategory });
      fetchCategories();
      setNewCategory("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
      fetchProducts();
    } catch (error) {
      console.error("Error deleting category:", error.response?.data || error.message);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!selectedCategory) return alert("Please select a category!");
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image_url) {
        return alert("Please fill in all fields.");
    }

    try {
        await axios.post("http://localhost:5000/api/products", {
            name: newProduct.name,
            price: newProduct.price,
            description: newProduct.description, // Ensure this is sent
            image_url: newProduct.image_url,
            category_id: selectedCategory, // Ensure category ID is correctly sent
        });

        fetchProducts();  // Fetch updated product list
        setNewProduct({ name: "", price: "", description: "", image_url: "" }); // Reset form
    } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message);
    }
};


  return (
    <div className="merchant-page">
      <h2 className="merchant-title">Merchant Dashboard</h2>

      {/* Add Category */}
      <div className="add-category">
        <input type="text" placeholder="New Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="input" />
        <button onClick={addCategory} className="add-button">Add Category</button>
      </div>

      {/* Category List */}
      <h3 className="category-title">Categories</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat._id} className="category-item">
            {cat.name}
            <button onClick={() => deleteCategory(cat._id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>

      {/* Add Product */}
      <div className="add-product">
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
  <option value="">Select Category</option>
  {categories.map((category) => (
    <option key={category._id} value={category._id}>{category.name}</option> // Use ID instead of name
  ))}
</select>

        <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="input" />
        <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="input" />
        <input type="text" placeholder="Image URL" value={newProduct.image_url} onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })} className="input" />
        <input
  type="text"
  placeholder="Product Description"
  value={newProduct.description}
  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
  className="input"
/>

        <button onClick={addProduct} className="add-button">Add Product</button>
      </div>

      {/* Product List */}
      <div className="product-list">
  <table className="product-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {products.map((prod) => (
        <tr key={prod._id}>
          <td>{prod.name}</td>
          <td>${prod.price}</td>
          <td>{prod.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}

export default MerchantPage;
