import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/axios";
import { useSelector } from "react-redux";
import { Heart } from "lucide-react";

const PersonaCard = ({ persona }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorites on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      try {
        const { data } = await API.get("/routes/Fav/favorites");
        setIsFavorite(data.favorites.includes(persona._id));
      } catch (err) {
        console.error("Failed to load favorites", err);
      }
    };

    fetchFavorites();
  }, [user, persona._id]);

  const toggleFavorite = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const { data } = await API.post(`/routes/Fav/favorites/${persona._id}`);
      setIsFavorite(data.favorites.includes(persona._id));
    } catch (err) {
      console.error("Toggle favorite failed", err);
    }
  };

  const handleChatNow = () => {
    navigate("/chat/start", { state: { persona } });
  };

  return (
    <div className="card bg-base-200 border border-[#636ae8] shadow-md p-2 m-2 transition-all duration-300 gap-2 hover:shadow-lg hover:scale-105 flex flex-col items-center relative">
      {/* Favorite Heart */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition"
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >
        <Heart
  strokeWidth={2}
  stroke={isFavorite ? "#ef4444" : "#9ca3af"} // red-500 or gray-400
  fill={isFavorite ? "#ef4444" : "none"}       // fill red or none
  className="w-5 h-5 transition-all duration-200"
/>

      </button>

      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <img
          src={persona.avatar || "/default-avatar.png"}
          alt={persona.name}
          className="w-32 h-36 mt-4 object-cover rounded-full ring ring-[#636ae8] hover:ring-4 transition-all duration-300 shadow-lg hover:shadow-2xl"
        />
      </div>

      {/* Name + Description */}
      <div className="text-center px-2">
        <h2 className="text-[16px] font-semibold mb-2">{persona.name}</h2>
        <p className="text-[13px] opacity-60">{persona.description}</p>
      </div>

      {/* CTA */}
      <div className="mt-auto w-full px-4">
        <button
          onClick={handleChatNow}
          className="btn btn-sm bg-[#636ae8] w-full mt-4 mb-4 hover:bg-[#5c60a7] text-white transition-colors duration-200"
        >
          Chat Now
        </button>
      </div>
    </div>
  );
};

export default PersonaCard;
    