import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductUpload from "../Productuploadpage/ProductUpload";
import Products from "../AllProducts/Products";
import Dashboard from "../Dashboard/Dashboard";
import AdminCategory from "../AdminCategory/AdminCategory";

import "./adminpage.css";

const Adminpage = () => {
  const [activepage, setActivepage] = useState("Dashboard");
  const [dashboard, setDashboard] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (activepage === "Dashboard" && !dashboard) {
      fetchDashboard();
    }
  }, [activepage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoadingDashboard(true);
      const token = localStorage.getItem("token");

      const res = await fetch("https://e-commerce-2tio.onrender.com/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDashboard(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`https://e-commerce-2tio.onrender.com/order/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Update failed:", err);
        return;
      }

      const data = await res.json();
      console.log("Status updated:", data);

      fetchOrders(); // refresh list
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://e-commerce-2tio.onrender.com/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Remove this order from list?")) return;

    const token = localStorage.getItem("token");

    const res = await fetch(`https://e-commerce-2tio.onrender.com/order/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setOrders(orders.filter((o) => o._id !== id));
    }
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://e-commerce-2tio.onrender.com/order/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    if (activepage === "Orders") {
      fetchOrders();
    }
  }, [activepage]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="main-box">
      <div className="first-box">
        <button
          className={`bttn ${activepage === "Dashboard" ? "active" : ""}`}
          onClick={() => setActivepage("Dashboard")}
        >
          Dashboard
        </button>

        <button
          className={`bttn ${activepage === "Orders" ? "active" : ""}`}
          onClick={() => {
            setActivepage("Orders");
            fetchOrders();
          }}
        >
          Orders
        </button>

        <button
          className={`bttn ${activepage === "Clients" ? "active" : ""}`}
          onClick={() => {
            setActivepage("Clients");
            fetchUsers();
          }}
        >
          Clients
        </button>

        <button
          className={`bttn ${activepage === "Products" ? "active" : ""}`}
          onClick={() => setActivepage("Products")}
        >
          Products
        </button>

        <button
          className={`bttn ${activepage === "Upload Page" ? "active" : ""}`}
          onClick={() => setActivepage("Upload Page")}
        >
          Upload Page
        </button>

        <button
          className={`bttn ${activepage === "Settings" ? "active" : ""}`}
          onClick={() => setActivepage("Settings")}
        >
          Category
        </button>

        <button className="bttn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="second-box">
        {activepage === "Upload Page" && <ProductUpload />}
        {activepage === "Products" && <Products />}

        {activepage === "Clients" && (
          <div>
            <h2>All Users</h2>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.fullname}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activepage === "Dashboard" && loadingDashboard && (
          <p style={{ padding: "20px" }}>Loading dashboard...</p>
        )}

        {activepage === "Dashboard" && dashboard && (
          <Dashboard dashboard={dashboard} />
        )}

        {activepage === "Orders" && (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o.user?.fullname}</td>
                  <td>₹{o.totalAmount}</td>
                  <td>
                    <select
                      className={`status ${o.status}`}
                      value={o.status}
                      onChange={(e) => updateStatus(o._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteOrder(o._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activepage === "Settings" && <AdminCategory />}
      </div>
    </div>
  );
};

export default Adminpage;
