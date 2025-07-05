import { useEffect, useState } from "react";
import PersonaCard from "./PersonaCard";
import API from "../utils/axios";

const categories = [
  "All",
  "Emotional & Self Help",
  "Spiritual & Mystical",
  "Learning",
  "Career",
  "Everyday Companions",
  "Fun",
  "Roleplay"
];

const Personas = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const { data } = await API.get("/personas");
        const combined = [...data.default, ...data.custom];
        setPersonas(combined);
      } catch (err) {
        console.error("Failed to load personas", err);
      }
    };

    fetchPersonas();
  }, []);

  const filtered = personas.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-6 py-8">
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
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn btn-sm whitespace-nowrap rounded-full ${
              selectedCategory === cat ? "btn-primary" : "btn-soft"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt4">
        {filtered.map((persona, index) => (
          <PersonaCard key={persona._id || persona.name || index} persona={persona} />
        ))}
      </div>
    </div>
  );
};

export default Personas;
