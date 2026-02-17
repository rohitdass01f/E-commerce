import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import img1 from "../../assets/photo1.webp";
import img2 from "../../assets/photo2.webp";
import img3 from "../../assets/photo3.webp";
import img4 from "../../assets/photo4.webp";
import "./carousel.css";

const images = [img1, img2, img3, img4];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

//   const nextSlide = () => {
//     setCurrent(current === images.length - 1 ? 0 : current + 1);
//   };

//   const prevSlide = () => {
//     setCurrent(current === 0 ? images.length - 1 : current - 1);
//   };

  return (
    <div className="carousel-box">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          className={`carousel-img ${index === current ? "active" : ""}`}
        />
      ))}

      {/* <button className="arrow-btn left" onClick={prevSlide}>
        <IoIosArrowBack size={25} />
      </button>

      <button className="arrow-btn right" onClick={nextSlide}>
        <IoIosArrowForward size={25} />
      </button> */}

      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? "active-dot" : ""}`}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
