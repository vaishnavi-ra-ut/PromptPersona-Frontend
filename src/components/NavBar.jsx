import { useTheme } from "../utils/useTheme";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

return (
    <div className="navbar bg-base-300 shadow-sm px-6">
  <div className="flex-2">
    <Link to="/" >
      <img src="https://i.postimg.cc/VLdr9wj5/Screenshot-2025-07-04-131202-removebg-preview.png" alt ="PromptPersona" className="w-[8.5rem]  "/>
    </Link>
  </div>

<label className="relative inline-flex items-center cursor-pointer w-12 h-[25px]">
  <input
    type="checkbox"
    className="sr-only peer"
    onChange={toggleTheme}
    checked={theme === "dark"}
  />
  
  {/* Track */}
  <div className="w-full h-full bg-gray-100 dark:bg-gray-600 peer-checked:bg-gray-700 rounded-full transition-colors duration-300" />

  {/* Sliding knob with icon inside */}
  <div
    className="absolute left-0.5  w-5 h-5 rounded-full 
               flex items-center justify-center text-lg
               transition-transform duration-300
               peer-checked:translate-x-6
               bg-white dark:bg-gray-800 text-gray-800 dark:text-yellow-300"
  >
    {theme === "dark" ? "🌙" : "☀️"}
  </div>
</label>



</div>

);
};

export default Navbar;
