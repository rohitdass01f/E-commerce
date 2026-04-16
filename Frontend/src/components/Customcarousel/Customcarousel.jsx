import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./customcarousel.css"; 

const images = [
  "/assets/Allsaints.webp",
  "/assets/sharktank.webp",
  "/assets/CentralCee.webp",
  "/assets/CheckCheckAuth.webp",
  "/assets/store.webp",
  "/assets/USP.webp",
  "/assets/Yeezy Desktop.webp",
];

const Customcarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <div className="carousel-container">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`slide-${index}`}
          className={`carousel-image ${index === current ? "active" : ""}`}
        />
      ))}

      <button onClick={prevSlide} className="carousel-btn left-btn">
        <IoIosArrowBack size={40} />
      </button>

      <button onClick={nextSlide} className="carousel-btn right-btn">
        <IoIosArrowForward size={40} />
      </button>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`dot ${index === current ? "active-dot" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Customcarousel;
