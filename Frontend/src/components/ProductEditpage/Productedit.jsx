import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./productedit.css";

const Productedit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [sizes, setSizes] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    if (categories.length && category) {
      const parent = categories.find((c) => c._id === category)?.parent;

      setParentCategory(parent || "");
    }
  }, [categories, category]);

  const getSingleProduct = async () => {
    const res = await fetch(`http://localhost:3000/product/${id}`);
    const data = await res.json();

    setGender(data.gender || "unisex");
    setProductName(data.productName);
    setPrice(data.price);
    setCategory(data.category);
    setSizes(data.sizes.join(","));
    setBrand(data.brand);
    setImage(data.image);
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      productName,
      price,
      category,
      sizes: sizes.split(",").map((s) => s.trim()),
      brand,
      image,
      gender,
    };

    await fetch(`http://localhost:3000/product/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    alert("Product Updated Successfully!");
    navigate(`/product/${id}`);
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">Edit Product</h2>

        <form onSubmit={handleUpdate} className="upload-form">
          <div className="raw-box">
            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="raw-box">
            {/* MAIN CATEGORY */}
            <div className="form-group">
              <label className="form-label">Main Category</label>
              <select
                value={parentCategory}
                onChange={(e) => {
                  setParentCategory(e.target.value);
                  setCategory("");
                }}
                className="form-input"
              >
                <option value="">Select Main Category</option>

                {categories
                  .filter((c) => !c.parent || c.parent === null)
                  .map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* SUB CATEGORY */}
            <div className="form-group">
              <label className="form-label">Sub Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
                required
              >
                <option value="">Select Sub Category</option>

                {categories
                  .filter(
                    (c) => c.parent && c.parent.toString() === parentCategory,
                  )

                  .map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="raw-box">
            <div className="form-group">
              <label className="form-label">Gender</label>

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="form-input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Sizes</label>
              <input
                type="text"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <button className="upload-btn">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default Productedit;
