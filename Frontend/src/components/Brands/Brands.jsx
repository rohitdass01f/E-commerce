import nike from "../../assets/nike.jpg";
import adidas from "../../assets/adidas.jpg";
import dior from "../../assets/dior.jpg";
import essentials from "../../assets/essentials.jpg";
import ovo from "../../assets/evo.jpg";
import supreme from "../../assets/supreme.jpg";
import nb from "../../assets/nb.jpg";
import vans from "../../assets/vans.jpg";
import lv from "../../assets/lv.jpg";
import plamangel from "../../assets/plam-angels.jpg";
import kenzo from "../../assets/kenzo.jpg";
import assc from "../../assets/assc.jpg";
import "./brands.css";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Brand = () => {
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);

  const startScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    stopScroll();

    scrollInterval.current = setInterval(() => {
      container.scrollLeft += direction === "right" ? 8 : -8;
    }, 15);
  };

  const stopScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  const handleMouseMove = (e) => {
    const container = scrollRef.current;
    if (!container) return;
    const { left, width } = container.getBoundingClientRect();
    const x = e.clientX - left;

    if (x > width * 0.7) startScroll("right");
    else if (x < width * 0.3) startScroll("left");
    else stopScroll();
  };

  const brands = [
    { src: nike, name: "Nike" },
    { src: adidas, name: "Adidas" },
    { src: dior, name: "Dior" },
    { src: essentials, name: "Essentials" },
    { src: ovo, name: "ovo" },
    { src: supreme, name: "Supreme" },
    { src: nb, name: "New Balance" },
    { src: vans, name: "Vans" },
    { src: lv, name: "Louis Vuitton" },
    { src: plamangel, name: "Palm Angels" },
    { src: kenzo, name: "Kenzo" },
    { src: assc, name: "ASSC" },
  ];

  return (
    <div className="brandbox">
      <div className="boxheading">
        <span>SHOP FROM GLOBAL BRANDS</span>
      </div>

      <div
        className="imgbox"
        ref={scrollRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={stopScroll}
      >
        {brands.map((brand, i) => (
          <div className="brand-item" key={i} onMouseMove={handleMouseMove}>
            <Link to={`/ProductCard?brand=${brand.name.toLowerCase()}`}>
              <img src={brand.src} alt={brand.name} className="brandimg" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;
