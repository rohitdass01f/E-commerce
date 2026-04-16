import "./ProductCard.css";
import airforce1 from "../../assets/airforce1.webp";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const brandparam = searchParams.get("brand");
  const brand = brandparam
    ? brandparam.charAt(0).toUpperCase() + brandparam.slice(1).toLowerCase()
    : "";
  console.log(brand);

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://e-commerce-2tio.onrender.com/product`);

      const data = await response.json();
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = brandparam
    ? product.filter(
        (p) => (p.brand || "").trim().toLowerCase() === brandparam.toLowerCase()
      )
    : product;

  // const a = [
  //   { name: "abc", age: 20 },
  //   { name: "abc", age: 25 },
  //   { name: "abc", age: 22 },
  // ];

  // const b = a.filter((user) => {
  //   return product.brand === brandParam;
  // });

  // console.log(b);

  return (
    <div className="brandProducts">
      <div className="brand-name">
        <h2 style={{ fontWeight: 600, fontSize: "30px" }}>{brand}</h2>
        <h3 style={{ color: "#666666" }}>Showing All Results</h3>
      </div>

      <div className="products-grid">
        {loading ? (
          <p>Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p>No products found for "{brandparam}"</p>
        ) : (
          filteredProducts.map((prod) => {
            console.log("prod in Card:", prod);
            const id = prod._id || prod.id;
            console.log("id in Card:", id);
            return (
              <Link key={id} to={`/product/${id}`}>
                <div className="product-card">
                  <img
                    src={
                      Array.isArray(prod.image)
                        ? prod.image[0]
                        : prod.image || airforce1
                    }
                    alt={prod.productName || prod.name}
                    className="product-img"
                  />
                  <h4>{prod.productName || prod.name}</h4>
                  <p>₹{prod.price}</p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductCard;
