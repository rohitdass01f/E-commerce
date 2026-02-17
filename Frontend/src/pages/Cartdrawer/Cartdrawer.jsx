import React, { useEffect, useState } from "react";
import "./cartdrawer.css";
import Cartitem from "../Cartitempage/Cartitem";
import { useNavigate } from "react-router-dom";

const Cartdrawer = ({ open, onClose }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const STORAGE_KEY = user?._id
    ? `my_cart_items_${user._id}`
    : "my_cart_items_guest";

  useEffect(() => {
    const interval = setInterval(() => {
      setUser(JSON.parse(localStorage.getItem("user")));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setCart(saved);
  }, [STORAGE_KEY]);

  useEffect(() => {
    if (open) {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      setCart(saved);
    }
  }, [open, STORAGE_KEY]);

  useEffect(() => {
    if (open) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, open, STORAGE_KEY]);

  const updateQty = (id, qty) => {
    setCart((c) => c.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const removeItem = (id) => {
    setCart((c) => c.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((total, item) => {
    const price = Number(item.price.toString().replace(/,/g, ""));
    return total + price * item.qty;
  }, 0);
  return (
    <>
      <div className={`backdrop ${open ? "show" : ""}`} onClick={onClose}></div>

      <div className={`cartDrawer ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart ({cart.length})</h2>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <p className="empty">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <Cartitem
                key={item.id}
                item={item}
                onQtyChange={(qty) => updateQty(item.id, qty)}
                onRemove={() => removeItem(item.id)}
              />
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="subtotal">
            <span>Subtotal</span>
            <strong>₹{subtotal.toLocaleString()}</strong>
          </div>
          <button
            className="checkout-btn"
            disabled={cart.length === 0}
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cartdrawer;
