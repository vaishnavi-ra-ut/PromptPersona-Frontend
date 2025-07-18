import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../utils/axios";
import ChatUI from "../components/ChatUI";

const ChatPage = () => {
  const { state } = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [chatId, setChatId] = useState(null);
  const [error, setError] = useState(null);
  const [persona, setPersona] = useState(null);

  useEffect(() => {
    if (!state || !state.persona) {
      setError("Invalid access. Please select a persona first.");
      return;
    }

    if (!user) {
      setError("Please login to start chatting.");
      return;
    }

    const startChat = async () => {
      try {
        const res = await API.post("/chat/start", {
          persona: state.persona,
        });
        setChatId(res.data.chat._id);
        setPersona(res.data.chat.persona);
      } catch (err) {
        console.error("Error starting chat:", err);
        setError("Failed to start chat. Please try again later.");
      }
    };

    startChat();
  }, [state, user]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  if (!chatId || !persona) {
    return (
      <div className="h-screen flex items-center justify-center text-base-content text-lg">
        Loading chat...
      </div>
    );
  }

  return <ChatUI chatId={chatId} persona={persona} />;
};

export default ChatPage;
