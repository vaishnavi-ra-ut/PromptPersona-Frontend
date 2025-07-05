import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Navbar from './components/NavBar';
import EditProfile from "./components/EditProfile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./utils/authSlice";
import API from "./utils/axios";
import Personas from "./components/Personas";

function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user) {
          const { data } = await API.get("/profile", { withCredentials: true });
          dispatch(setCredentials({ user: data, token: "cookie-token" }));
        }
      } catch (err) {
        console.log("User not logged in:", err.message);
      }
    };
      checkAuth();
  }, [dispatch, user]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Personas/>} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/edit" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;