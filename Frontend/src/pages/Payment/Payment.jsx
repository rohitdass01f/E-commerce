import { useParams , useNavigate } from "react-router-dom";
import "./payment.css";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const payNow = async () => {
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch(`https://e-commerce-2tio.onrender.com/payment/create/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      console.log("PAYMENT CREATE ERROR 👉", data);
      alert(data.message || "Payment create failed");
      return;
    }
    console.log("CREATE PAYMENT RESPONSE 👉", data);

    const options = {
      key: data.key,
      amount: data.amount,
      currency: "INR",
      order_id: data.razorpayOrderId,

      handler: async function (response) {
        await fetch("https://e-commerce-2tio.onrender.com/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...response,
            orderId: id,
          }),
        });

       navigate(`/thankyou/${id}`);

      },
    };

    options.modal = {
      ondismiss: function () {
        alert("Payment cancelled ❌");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2>Complete Your Payment</h2>
        <p className="order-id">Order ID: {id}</p>

        <div className="secure-box">🔒 100% Secure Payment via Razorpay</div>

        <button className="pay-btn" onClick={payNow}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
