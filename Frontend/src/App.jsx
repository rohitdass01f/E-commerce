import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Nav from "./nav/Nav";
import Login from "./components/loginpage/LoginPage";
import Signup from "./components/Signuppage/Signup";
import ProductUpload from "./components/Productuploadpage/ProductUpload";
import ProductCard from "./components/ProductCard/ProductCard";
import Footer from "./footerPage/Footerpage";
import Profile from "./pages/ProfilePage/Profile";
import Adminpage from "./components/Admin Dashboard/Adminpage";
import { ThemeProvider } from "./context/ThemeContext";
import Productbuy from "./pages/Productbuypage/Productbuy";
import Productedit from "./components/ProductEditpage/Productedit";
import Searchpage from "./components/Searchpage/Searchpage";
import Checkout from "./pages/Checkoutpage/Checkout";
import Payment from "./pages/Payment/Payment";
import Thankyou from "./pages/Thankyou Card/ThankyouCard";
import { useEffect, useState } from "react";


const App = () => {
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

  return (
    <div className=" flex flex-col min-h-screen w-full dark">
      <ThemeProvider>
        <Router>
          <Nav products={product} />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/ProductUpload" element={<ProductUpload />} />
              <Route path="/ProductCard" element={<ProductCard />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/product/:id" element={<Productbuy />} />
              <Route path="/Productedit/:id" element={<Productedit />} />
              <Route path="/search" element={<Searchpage />} />
              <Route path="/Adminpage" element={<Adminpage />} />
              <Route path="/Checkout" element={<Checkout/>}/>
              <Route path="/payment/:id" element={<Payment/>}/>
              <Route path="/thankyou/:id" element={<Thankyou/>}/>
            </Routes>
          </div>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
};
export default App;
