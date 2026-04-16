import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./products.css";

const user = JSON.parse(localStorage.getItem("user"));
const CART_KEY = user?._id
  ? `my_cart_items_${user._id}`
  : "my_cart_items_guest";

const Products = () => {
  const [product, setProduct] = useState([]);

  const getproduct = async () => {
    try {
      const response = await fetch("https://e-commerce-2tio.onrender.com/product");

      const data = await response.json();
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getproduct();
  }, []);

  const handleDelete = async (id, e) => {
  e.preventDefault(); // link navigation rokne ke liye
  e.stopPropagation();

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await fetch(`https://e-commerce-2tio.onrender.com/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      alert("Product deleted");

     
      setProduct((prev) => prev.filter((item) => item._id !== id));
    } else {
      alert(data.message || "Delete failed");
    }
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className="Products-list">
      <div className="allProduct">
        <h3>Showing All Results</h3>
      </div>

      <div className="products-grid">
        {product.length === 0 ? (
          <p>No products found</p>
        ) : (
          product.map((item) => {
            const id = item._id || item.id;

            return (
              <Link key={id} to={`/product/${id}`}>
                <div className="product-card">
                  <div className="img-wrapper">
                    <img
                      src={
                        Array.isArray(item.image)
                          ? item.image[0]
                          : item.image || airforce1
                      }
                      alt={item.productName}
                      className="allproduct-img"
                    />
                    {user?.role === "admin" && (
                      <Link to={`/Productedit/${id}`}>
                        <div className="edit icon">
                          <MdOutlineEdit />
                        </div>
                      </Link>
                    )}
                    {user?.role === "admin" && (
                      <div
                        className="delete icon"
                        onClick={(e) => handleDelete(id, e)}
                      >
                        <RiDeleteBin6Line />
                      </div>
                    )}
                  </div>

                  <h4>{item.productName}</h4>
                  <p>₹{item.price}</p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Products;
