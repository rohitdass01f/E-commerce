import { IoLogoInstagram } from "react-icons/io5";
import { FaSquareXTwitter, FaArrowRight } from "react-icons/fa6";
import { TbBrandYoutube } from "react-icons/tb";
import google from "../assets/googleplay.png";
import appstore from "../assets/App Store.png";
import "./FooterPage.css";

const FooterPage = () => {
  return (
    <footer className="footer">
      {/* LEFT */}
      <div className="footer-section">
        <h3>FOLLOW US ON</h3>
        <div className="social-icons">
          <a
            href="https://www.instagram.com/culturecircle_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoInstagram />
          </a>
          <a
            href="https://x.com/culturecircIe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSquareXTwitter />
          </a>
          <a
            href="https://www.youtube.com/@Culture-Circle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TbBrandYoutube />
          </a>
        </div>
      </div>

      {/* CENTER */}
      <div className="footer-section center">
        <h3>DOWNLOAD THE CULTURE CIRCLE APP</h3>
        <div className="store-buttons">
          <a
            href="https://play.google.com/store/apps/details?id=com.cc.culture_circle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={google} alt="Google Play" />
          </a>
          <a
            href="https://apps.apple.com/in/app/culture-circle-hype-luxury/id6450005233"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={appstore} alt="App Store" />
          </a>
        </div>

        <p className="copyright">
          © 2025 CultureCircle — All rights reserved <br />
          METACIRCLES TECHNOLOGIES PVT LTD
        </p>
      </div>

      {/* RIGHT */}
      <div className="footer-section">
        <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
        <div className="newsletter">
          <input type="email" placeholder="Enter your email address" />
          <button className="email-btn">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
