import { useState } from "react";
import verticalcclogo from "../../assets/verticalcclogo.webp";
import "./signup.css"; 

const Signup = () => {
  const [signInData, setSigninData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSigninData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.href = "/Login";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <img
          src={verticalcclogo}
          alt="logo"
          className="signup-logo"
        />

        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={signInData.fullname}
              onChange={handleChange}
              name="fullname"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={signInData.email}
              onChange={handleChange}
              name="email"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={signInData.password}
              onChange={handleChange}
              name="password"
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="signup-footer">
          Already have an account?{" "}
          <a href="/Login" className="signup-link">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
