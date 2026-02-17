import { useState } from "react";
import verticalcclogo from "../../assets/verticalcclogo.webp";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("tokenChange"));
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          alert("Admin Logged In");
          navigate("/");
        } else {
          alert("User Logged In");
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={verticalcclogo} alt="logo" className="login-logo" />

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FaRegEye />
            </span>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <a href="/Signup" className="login-link">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
