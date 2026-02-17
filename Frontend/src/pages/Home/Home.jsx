import Customcarousel from "../../components/Customcarousel/Customcarousel";
import Brands from "../../components/Brands/Brands";
import Strip from "../../components/Strip/Strip";
import Daydeal from "../Daydeals/Daydeal";
import Store from "../Store/Store";

const Home = () => {
  return (
    <div>
      <Strip />
      <Customcarousel />
      <Brands />
      <Daydeal/>
      <Store/>
    </div>
  );
};

export default Home;
