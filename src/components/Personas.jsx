import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PersonaCard from "./PersonaCard";
import API from "../utils/axios";

const categories = [
  "All",
  "Your Personas",
  "Emotional & Self Help",
  "Spiritual & Mystical",
  "Learning",
  "Career",
  "Everyday Companions",
  "Fun",
  "Roleplay",
];

const Personas = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [defaultPersonas, setDefaultPersonas] = useState([]);
  const [customPersonas, setCustomPersonas] = useState([]);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/personas");
        setDefaultPersonas(data.default || []);
        setCustomPersonas(data.custom || []);
      } catch (err) {
        console.error("Failed to load personas", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "Your Personas" && !user) {
      setShowLoginMessage(true);
    } else {
      setShowLoginMessage(false);
    }
  }, [selectedCategory, user]);

  // Filter logic
  let filtered = [];

  if (selectedCategory === "Your Personas") {
    filtered = user
      ? customPersonas.filter((p) => p.createdBy === user._id)
      : [];
  } else {
    const combined = [...defaultPersonas, ...customPersonas];
    filtered = combined.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  return (
    <div className="px-6 py-4 mt-16">
      <div className="flex justify-between items-center mb-6 mx-auto sm:flex-row flex-col sm:gap-0 gap-4">
        <div className="text-[#636ae8] text-xl font-semibold mx-auto md:pl-28">
          {user ? `Hi ${user.name} 👋` : "Hi There, Personas For You"}
        </div>

        <button
          onClick={() => navigate("/personas/custom")}
          className="btn btn-sm text-[#f7438b] bg-base-100 hover:bg-base-300 border-[#f7438b] hover:border-[#f7438b] transition-all duration-200 rounded-full shadow-md hover:shadow-sm items-center gap-2"
        >
          + Create Persona
        </button>
      </div>

      {/* Search Bar */}
      <div className="w-full flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search personas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input w-full max-w-md h-8 rounded-full placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#636ae8] transition-all duration-200 hover:ring-2 hover:ring-[#636ae8] bg-base-200 text-gray-600"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-3 ml-2 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setShowLoginMessage(false);
            }}
            className={`btn btn-sm whitespace-nowrap rounded-full opacity-85 ${
              selectedCategory === cat ? "btn-primary" : "btn-soft"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Login Prompt */}
      {showLoginMessage && !user && (
        <div className="text-center my-6">
          <p className="text-gray-600 mb-2">
            Please login to view or create your personas.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="btn btn-primary btn-sm rounded-full"
          >
            Login
          </button>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-3">
        {filtered.map((persona, index) => (
          <PersonaCard key={persona._id || index} persona={persona} />
        ))}
      </div>
    </div>
  );
};

export default Personas;
