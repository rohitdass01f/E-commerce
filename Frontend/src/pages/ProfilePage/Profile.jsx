//

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-card">
          <h2 className="profile-title">User Profile</h2>

          <div className="profile-info">
            <p>
              <strong>Full Name:</strong> {user.fullname}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p className="loading-text">Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
