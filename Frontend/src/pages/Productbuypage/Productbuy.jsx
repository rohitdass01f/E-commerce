import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import { BsCashStack } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import Carousel from "../../components/Smallcarousel/Carousel";
import dswt from "../../assets/dswt3.png";
import tick from "../../assets/tick.svg";
import highlight from "../../assets/highlight.svg";
import newicon from "../../assets/newicon.svg";
import "./productbuy.css";


const user = JSON.parse(localStorage.getItem("user"));
const CART_KEY = user?._id
  ? `my_cart_items_${user._id}`
  : "my_cart_items_guest";


const Productbuy = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { id } = useParams();
  console.log("ID =", id);

  
const addToCart = () => {

  if (!selectedSize) {
    alert("Please select a size first!");
    return;     
  }

  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  cart.push({
    id: product._id,
    title: product.productName,
    price: product.price,
    image: selectedImage,
    qty: 1,
    size: selectedSize,
  });

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  alert("Added to Cart!");
};


const getRelatedProducts = async (brand) => {
  try {
    const res = await fetch(
  `http://localhost:3000/product/brand/${product.brand}?exclude=${id}`
)


    const data = await res.json();
    setRelatedProducts(data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  if (product?.brand) {
    getRelatedProducts(product.brand);
  }
}, [product]);


  const getProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/product/${id}`);

      const data = await response.json();
      console.log(data);
      setProduct(data);
      setSelectedImage(data.image[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [id]);

  if (!product) return <p>Loading...</p>;
  return (
    <>
    <div className="main-container">
      <div className="thumbnail-row">
        {product.image.map((img, i) => (
          <img
            src={img}
            key={i}
            className={`thumbnail ${
              selectedImage === img ? "active-thumb" : ""
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      <div className="product-img">
        <img src={selectedImage} alt="" />
      </div>

      <div className="product-info">
        <div className="product-brand">
          <div className="brand">
            <p className="category">{product.category?.toUpperCase()}</p>
            <p>{product.brand?.toUpperCase()}</p>
          </div>
          <p className="productname">{product.productName}</p>
          <div className="newicon-box">
            <img src={newicon} alt="" />
            <p>NEW</p>
          </div>
        </div>

        <p className="size-heading">Select Your Size</p>
        <div className="sizes">
          {product?.sizes?.map((s) => (
            <span
              className={`size-box ${selectedSize === s ? "active" : ""}`}
              key={s}
              onClick={() => setSelectedSize(s)}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="price-section">
          <div className="delivery-sec">
            <img src={dswt} alt="" />
            <div className="delivery-text">
              <img src={tick} alt="" />
              FREE DELIVERY &nbsp;| <img src={highlight} alt="" /> 7 DAYS
            </div>
          </div>
          <div className="price-box">
            <p className="currancy">INR</p>
            <p className="productprice"> {product.price}</p>
          </div>
        </div>
        <div className="btn">
          {user?.role === "admin" && (
            <Link to={`/Productedit/${id}`}>
              <button className="edit-product-btn">Edit Product</button>
            </Link>
          )}

          <Link>
            <button onClick={addToCart}>
              &nbsp; &nbsp; Add to Cart <FaArrowRight size={20} />
            </button>
          </Link>
        </div>

        <div className="buying-policy">
          <div>
            <LiaShippingFastSolid size={25} />
            <p>
              &nbsp; Shipping <br /> & Delivery
            </p>
          </div>
          <div>
            <BsCashStack size={25} />
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Cash <br /> on Delivery Available
            </p>
          </div>
          <div>
            <GiReturnArrow size={25} />
            <p>
              Buyer Protection <br />
              &nbsp;&nbsp; Return Policy
            </p>
          </div>
        </div>

        <div className="product-carousel">
          <Carousel />
        </div>
      </div>

    </div>
    <div className="related-section">
  <h2>More from {product.brand}</h2>

  <div className="related-grid">
    {relatedProducts.slice(0,10).map((item) => (
      <Link to={`/product/${item._id}`} key={item._id}>
        <div className="related-card">
          <img src={item.image[0]} alt="" />
          <p>{item.productName}</p>
          <span>₹{item.price}</span>
        </div>
      </Link>
    ))}
  </div>
</div>
</>
  );
};

export default Productbuy;
