import { CiDark } from "react-icons/ci";
import { useTheme } from "../../context/ThemeContext";
import { BsSunFill } from "react-icons/bs";

const Darkmodetoggle = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:bg-green-300 rounded-sm transition cursor-pointer dark:hover:text-black"
    >
      {isDark ? <BsSunFill size={20} /> : <CiDark size={20} />}
    </button>
  );
};

export default Darkmodetoggle;
