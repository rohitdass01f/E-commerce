import { useState, useEffect } from "react";

import "./productupload.css";

const ProductUpload = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [sizes, setSizes] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    fetch("https://e-commerce-2tio.onrender.com/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const formatPrice = (value) => {
    const cleaned = value.replace(/,/g, "");

    if (cleaned === "" || isNaN(cleaned)) return "";

    return Number(cleaned).toLocaleString("en-IN");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    let imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append("file", images[i]);
      formData.append("upload_preset", "default");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dw9d8y3hk/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      imageUrls.push(data.url);
    }

    uploadToServer(imageUrls);
  };

  const uploadToServer = async (urls) => {
    await fetch("https://e-commerce-2tio.onrender.com/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName,
        price,
        image: urls,
        category,
        sizes: sizes.split(",").map((s) => s.trim()),
        brand,
      }),
    });

    alert("Product Uploaded!");
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">Upload New Product</h2>

        <form onSubmit={handleSubmit} className="upload-form">
          {/* Product Name */}
          <div className="upload-first-raw">
            <div className="form-group">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="productName" className="form-label">
                Brand Name
              </label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="upload-second-raw">
            <div className="form-group">
              <label htmlFor="productName" className="form-label">
                Product Price
              </label>
              <input
                id="price"
                type="text"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(formatPrice(e.target.value))}
                className="form-input"
                required
              />
            </div>

             <div className="form-group">
            <label className="form-label">Gender</label>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-input"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

         
          </div>

        
          <div className="upload-third-raw">
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

         

          <div className="upload-third-raw">
            <div className="form-group">
              <label htmlFor="sizes" className="form-label">
                Sizes (comma separated)
              </label>
              <input
                id="sizes"
                type="text"
                placeholder="UK7, UK8, UK9 OR S, M, L, XL"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Upload Product Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImages([...e.target.files])}
                className="form-input file-input"
              />
            </div>
          </div>

          <button type="submit" className="upload-btn">
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpload;
