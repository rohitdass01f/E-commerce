import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import UserOrder from "./UserOrder";
import UserAddress from "./UserAddress";
import "./profile.css";

const Profile = () => {

  const [activePage,setActivePage] = useState("profile")
  const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (

    <div className="profile-main">

      {/* SIDEBAR */}

      <div className="profile-sidebar">

        <button
        className={activePage==="profile"?"active":""}
        onClick={()=>setActivePage("profile")}
        >
        Profile
        </button>

        <button
        className={activePage==="orders"?"active":""}
        onClick={()=>setActivePage("orders")}
        >
        Orders
        </button>

        <button
        className={activePage==="address"?"active":""}
        onClick={()=>setActivePage("address")}
        >
        Address
        </button>

        <button className="bttn" onClick={handleLogout}>
          Logout
        </button>

      </div>


      {/* RIGHT SIDE */}

      <div className="profile-content">

      {activePage==="profile" && <ProfileDetails/>}
      {activePage==="orders" && <UserOrder/>}
      {activePage==="address" && <UserAddress/>}

      </div>

    </div>
  )
}

export default Profile;