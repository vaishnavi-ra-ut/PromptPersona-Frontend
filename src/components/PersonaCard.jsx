import { useNavigate } from "react-router-dom";

const PersonaCard = ({ persona }) => {
  const navigate = useNavigate();

  const handleChatNow = () => {
    navigate("/chat/start", { state: { persona } });
  };

  return (
    <div className="card bg-base-200 border border-[#636ae8] shadow-md p-2 m-2 transition-all duration-300 gap-2 hover:shadow-lg hover:scale-105 flex flex-col items-center relative">
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
