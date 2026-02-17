import delhi from "../../assets/Delhistore.webp";
import hyderabad from "../../assets/Hyderabadstore.webp";
import mumbai from "../../assets/Mumbai.webp";
import gurugram from "../../assets/Gurugramstore.webp";
import { IoStorefront } from "react-icons/io5";
import "./store.css";

const Store = () => {
  return (
    <div className="store-container">
      <div className="store-text">
        <div className="store-logo"><IoStorefront size={35} /></div>
        <p >&nbsp;&nbsp;WELCOME TO THE</p>
        <p style={{fontSize:"28px", fontWeight: "600"}}>&nbsp;&nbsp;&nbsp;&nbsp;Culture Circle Experience</p>
        <p style={{color: "#AAAAAA", fontWeight: "500"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Visit Delhi. Hyderabad. Mumbai And More Soon</p>
      </div>
      <div className="store">
        <a href="https://maps.app.goo.gl/1w6DEhp8M13G3hPy5" target="_blank" rel="noopener noreferrer"> <img src={delhi} alt="" /></a>
       <a href="https://maps.app.goo.gl/Ja1ZAu1pWQqHDWP17"  target="_blank" rel="noopener noreferrer"><img src={hyderabad} alt="" /></a>
        
        <img src={mumbai} alt="" />
        <img src={gurugram} alt="" />
      </div>
    </div>
  );
};

export default Store;
