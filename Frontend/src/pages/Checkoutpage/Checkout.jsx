import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

const user = JSON.parse(localStorage.getItem("user"));

const CART_KEY = user?._id
  ? `my_cart_items_${user._id}`
  : "my_cart_items_guest";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    setCart(saved);
  }, []);

  useEffect(() => {
    console.log("CART 👉", cart);
  }, [cart]);

  const totalAmount = cart.reduce((sum, item) => {
    const price = Number(item.price.toString().replace(/,/g, ""));
    return sum + price * item.qty;
  }, 0);

  const placeOrder = async () => {
    const token = localStorage.getItem("token");
    console.log("TOKEN 👉", token);

    const res = await fetch("http://localhost:3000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cart.map((item) => ({
          product: item._id || item.id,
          name: item.title,
          price: Number(item.price.toString().replace(/,/g, "")),
          quantity: item.qty,
          image: item.image,
        })),

        shippingAddress: address,
        totalAmount,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      navigate(`/payment/${data.order._id}`);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-grid">
        <div className="checkout-form">
          <h3>Shipping Details</h3>

          <input
            placeholder="Full Name"
            onChange={(e) =>
              setAddress({ ...address, fullName: e.target.value })
            }
          />

          <input
            placeholder="Phone Number"
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          />

          <input
            placeholder="Street Address"
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />

          <input
            placeholder="City"
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />

          <input
            placeholder="State"
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />

          <input
            placeholder="Pincode"
            onChange={(e) =>
              setAddress({ ...address, pincode: e.target.value })
            }
          />

          <input placeholder="Country" value="India" disabled />
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cart.map((item, i) => (
            <div key={i} className="summary-row">
              <span>{item.title}</span>
              <span>₹{item.price}</span>
            </div>
          ))}

          <div className="summary-row total">
            <strong>Total</strong>
            <strong>₹{totalAmount}</strong>
          </div>

          <button className="place-order-btn" onClick={placeOrder}>
            Place Order & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
