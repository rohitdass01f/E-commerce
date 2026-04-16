import React from "react";
import "./daydeal.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Daydeal = () => {
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const dayTitles = {
    Monday: "Marvelous Monday",
    Tuesday: "Terrific Tuesday",
    Wednesday: "Wonderful Wednesday",
    Thursday: "Thrilling Thursday",
    Friday: "Fantastic Friday",
    Saturday: "Super Saturday",
    Sunday: "Spectacular Sunday",
  };

  const title = dayTitles[day] || day;

  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  const getProducts = async () => {
    try {
      const response = await fetch("https://e-commerce-2tio.onrender.com/product");

      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleMouseMove = (e) => {
    const container = scrollRef.current;
    if (!container) return;

    const { left, width } = container.getBoundingClientRect();
    const x = e.clientX - left;

    if (x > width * 0.75) {
      container.scrollLeft += 20;
    } else if (x < width * 0.25) {
      container.scrollLeft -= 20;
    }
  };

  if (!products.length) return null;
  return (
    <div className="daydeals-container">
      <div className="daydeals-left">
        <h2 className="daydeals-title">{title}</h2>
        <p className="daydeals-subtitle">
          Unlock midweek magic with deals <br /> that keep you motivated.
        </p>
      </div>

      <div
        className="daydeals-products"
        ref={scrollRef}
        onMouseMove={handleMouseMove}
      >
        {products.slice(0,8).map((product) => (
          <Link  key={product._id || product.id} to={`/product/${product._id}`}>
            
            <div className="product-card" key={product.id}>
              <img
                 src={
                  Array.isArray(product.image)
                    ? product.image[0]
                    : product.image || ""
                }
                alt={product.productName || "product"}
                className="pro-img"
              />
              <p className="product-name">{product.productName}</p>
              <p className="product-price">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Daydeal;
