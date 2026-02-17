import { BsQuestionCircle } from "react-icons/bs";
import flag from "../assets/flag.png";
import { IoEnter, IoSearch } from "react-icons/io5";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import verticalcclogo from "../assets/verticalcclogo.webp";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import CartDrawer from "../pages/Cartdrawer/Cartdrawer";
import culturelogo from "../assets/culturelogo.webp";
import "./nav.css";

const Nav = ({ products }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cartCount, setCartCount] = useState(0);
  const [openCart, setOpenCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const handleClick = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
    } else if (storedUser.role === "admin") {
      navigate("/adminpage");
    } else {
      navigate("/profile");
    }
  };

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };

  const CART_KEY = user?._id
    ? `my_cart_items_${user._id}`
    : "my_cart_items_guest";

  useEffect(() => {
    const interval = setInterval(() => {
      setUser(JSON.parse(localStorage.getItem("user")));
      setToken(localStorage.getItem("token"));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkCart = () => {
      const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      setCartCount(cart.length);
    };

    checkCart();

    window.addEventListener("storage", checkCart);

    const interval = setInterval(checkCart, 500);

    return () => {
      window.removeEventListener("storage", checkCart);
      clearInterval(interval);
    };
  }, [CART_KEY]);

  return (
    <div>
      <div className="first-container">
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>

        <Link to="/">
          <img src={verticalcclogo} alt="" width={150} className="navLogo" />
          <img src={culturelogo} alt="" className="navnewlogo"/>
        </Link>

        <div className="mobile-right">
          <IoSearch size={22} />
          <button className="get-app-btn">Get App</button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            className="serach-bar"
            placeholder="Find Your Drip"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
        </div>
        <button className="search-icon">
          <IoSearch size={30} />
        </button>

        <div className={`nav-left ${menuOpen ? "open" : ""}`}>
          <div
            style={{
              border: "2px solid #c2c0c0",
              height: "45px",
              width: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              fontWeight: "500",
            }}
          >
            <img src={flag} alt="" className="flag" />
            <p>IN</p>
          </div>

          <div
            style={{
              border: "2px solid #c2c0c0",
              height: "45px",
              width: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BsQuestionCircle size={20} />
          </div>

          <div
            style={{
              border: "2px solid #c2c0c0",
              height: "45px",
              width: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => setOpenCart(true)}
            title="cart"
          >
            <FaShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge"></span>}
          </div>

          {token ? (
            <div
              style={{
                border: "2px solid #c2c0c0",
                borderRadius: "5px",
                height: "45px",
                width: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <FaUser
                size={21}
                onClick={handleClick}
                style={{ cursor: "pointer", width: "45px" }}
                title="Profile"
              />
            </div>
          ) : (
            <button className="logbtn" title="login">
              <Link to="/Login">Login</Link>
            </button>
          )}
        </div>
      </div>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </div>
  );
};

export default Nav;
