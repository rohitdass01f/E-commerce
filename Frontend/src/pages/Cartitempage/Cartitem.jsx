import React from "react";
import "./cartitem.css";

const Cartitem = ({ item, onQtyChange, onRemove }) => {
  return (
    <div className="cart-item">
        <div className="item-box">
      <img src={item.image} alt="" className="item-img" />

      <div className="item-info">
        <div className="item-title">{item.title}</div>
        <div className="item-price">₹{item.price}</div>

        <div className="qty-box">
          <button onClick={() => onQtyChange(Math.max(1, item.qty - 1))}>-</button>
          <span>{item.qty}</span>
          <button onClick={() => onQtyChange(item.qty + 1)}>+</button>
          <button className="remove-btn" onClick={onRemove}>
          Remove
        </button>
        </div>

        </div>
      </div>
    </div>
  );
};

export default Cartitem;
