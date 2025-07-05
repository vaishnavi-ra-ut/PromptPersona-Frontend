import { Link,  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/authSlice";
import { useTheme } from "../utils/useTheme";
import API from "../utils/axios";

const Navbar = () => {
  const [theme, setTheme] = useTheme();
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
  try {
    await API.post("/auth/logout", {}, { withCredentials: true }); // clear cookie
    dispatch(logout()); 
    navigate("/auth");

  } catch (err) {
    console.error("Logout failed:", err);
  }
};

  // if (location.pathname === "/auth") return null;

  const getGenderAvatar = () => {
    if (user?.gender === "male")
      return "https://i.postimg.cc/k4rKLtLz/avatarB.png";
    if (user?.gender === "female")
      return "https://i.postimg.cc/sXt66XJg/avatarG.png";
    if (user?.gender === "other")
      return "https://i.postimg.cc/RZrtWmbz/freepik-a-funny-avatar-of-an-animal-wearing-glasses-and-a-22489-removebg-preview.png";
    return "https://i.postimg.cc/RZrtWmbz/freepik-a-funny-avatar-of-an-animal-wearing-glasses-and-a-22489-removebg-preview.png";
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-6 justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <h3 className="text-xl font-bold text-[#636ae8]">PromptPersona</h3>
      </Link>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <label className="relative inline-flex items-center cursor-pointer w-12 h-[25px]">
          <input
            type="checkbox"
            className="sr-only peer"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <div className="w-full h-full bg-gray-100 dark:bg-gray-600 peer-checked:bg-gray-700 rounded-full transition-colors duration-300" />
          <div
            className="absolute left-0.5 w-5 h-5 rounded-full flex items-center justify-center text-lg
                       transition-transform duration-300 peer-checked:translate-x-6
                       bg-white dark:bg-gray-800 text-gray-800 dark:text-yellow-300"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </div>
        </label>

        {/* Greeting */}
        {user && (
          <p className="hidden md:block text-md mb-1 font-medium">
            Hi, {user.name}
          </p>
        )}

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 h-10 rounded-3xl ring ring-[#636ae8] ring-offset-base-100 ring-offset-2">
              <img
                alt="User Avatar"
                src={getGenderAvatar()}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu mt-6 z-[1] p-2 shadow bg-base-200 rounded-box w-48"
          >
            {user ? (
              <>
                <li>
                  <button onClick={() => navigate("/edit")}>
                    Edit Profile
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/settings")}>
                    Chat Settings
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 font-medium"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="text-sm text-gray-500 px-2 py-1">
                🔒 Login first to access profile & settings
                <button
                  className="btn btn-sm btn-primary mt-2 w-full"
                  onClick={() => navigate("/auth")}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;