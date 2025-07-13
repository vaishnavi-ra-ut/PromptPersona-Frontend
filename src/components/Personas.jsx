import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PersonaCard from "./PersonaCard";
import API from "../utils/axios";
import { fetchFavorites, toggleFavorite } from "../utils/favSlice"; 

const categories = [
  "All",
  "Favorites",
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
  const [personas, setPersonas] = useState([]);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const favoriteIds = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/personas");
        const combined = [...data.default, ...data.custom];
        setPersonas(combined);
      } catch (err) {
        console.error("Failed to load personas", err);
      }
    };

    fetchData();

    if (user) {
      dispatch(fetchFavorites());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (
      (selectedCategory === "Favorites" || selectedCategory === "Your Personas") &&
      !user
    ) {
      setShowLoginMessage(true);
    } else {
      setShowLoginMessage(false);
    }
  }, [selectedCategory, user]);

  const handleToggleFavorite = (personaId) => {
    if (!user) {
      setShowLoginMessage(true);
      return;
    }
    dispatch(toggleFavorite(personaId));
  };

  let filtered = [];

  if (selectedCategory === "Favorites") {
    if (!user) {
      filtered = [];
    } else {
      filtered = personas.filter((p) => favoriteIds.includes(p._id));
    }
  } else if (selectedCategory === "Your Personas") {
    if (!user) {
      filtered = [];
    } else {
      filtered = personas.filter((p) => p.createdBy === user._id);
    }
  } else {
    filtered = personas.filter((p) => {
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
        <div className="text-[#636ae8] text-xl font-semibold mx-auto md:pl-28 ">
          {user ? `Hi ${user.name} 👋` : "Hi There, Personas For You"}
        </div>

        <button
          onClick={() => navigate("/personas/custom")}
          className="btn btn-sm text-[#636ae8] bg-base-100 hover:bg-base-300 border-[#636ae8] hover:border-[#636ae8] transition-all duration-200 rounded-full shadow-md hover:shadow-lg items-center gap-2"
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
          <PersonaCard
            key={persona._id || persona.name || index}
            persona={persona}
            isFavorite={favoriteIds.includes(persona._id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Personas;
