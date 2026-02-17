import { useSearchParams ,Link } from "react-router-dom";
import { useEffect, useState ,useRef } from "react";
import "./searchpage.css";


const Searchpage = () =>{

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");



    const [product , setProduct] = useState([]);
    const [filterproducts, setFilterproducts] = useState([]);
    const Scrollref = useRef(null);

    const getproduct = async () =>{

      try {
        const response = await fetch("http://localhost:3000/product");

        const data = await response.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }

    }

    useEffect(()=>{
        getproduct();
    },[]);

    useEffect(()=>{
      if(!query) return;
       
      const filtered = product.filter((item)=>
        item.productName?.toLowerCase().includes(query.toLowerCase()) ||
        item.brand?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase()) 
      )
      setFilterproducts(filtered);
    },[query,product])

    return <div className="brandProducts">
      <div className="brand-name">
        <h2 style={{ fontWeight: 600, fontSize: "30px" }}>{query}</h2>
        <h3 style={{ color: "#666666" }}>Showing All Results</h3>
      </div>

      <div className="products-grid">
        { filterproducts.length === 0 ? (
          <p>No products found for </p>
        ) : (
          filterproducts.map((item) => {
            console.log("item in Card:", item);
            const id = item._id || item.id;
            console.log("id in Card:", id);
            return (
              <Link key={id} to={`/product/${id}`}>
                <div className="product-card">
                  <img
                    src={
                      Array.isArray(item.image)
                        ? item.image[0]
                        : item.image || airforce1
                    }
                    alt={item.productName || item.name}
                    className="search-product-img"
                  />
                  <h4>{item.productName || item.name}</h4>
                  <p>₹{item.price}</p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
}

export default Searchpage;