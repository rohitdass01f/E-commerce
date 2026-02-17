import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./thankyou.css";

const ThankyouCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="thankyou-page">
      <div className="thankyou-card">
        <h1> Order Placed Successfully!🎉</h1>
        <p>Your order ID:</p>
        <strong>{id}</strong>

        <p className="redirect-text">
          Redirecting to home in 5 seconds...
        </p>

        <button onClick={() => navigate("/")}>
          Go Home Now
        </button>
      </div>
    </div>
  );
};

export default ThankyouCard;
