import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";

const ChatUI = ({ chatId, persona }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const bottomRef = useRef();

  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: persona.name,
      content: `Hi! I'm ${persona.name}`,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { sender: user?.name || "You", content: userMessage }
    ]);

    setIsTyping(true); // Start typing

    try {
      const filledPrompt = persona.prompt
        .replace("{age}", user?.age || "young")
        .replace("{gender}", user?.gender || "person");

      const finalPrompt = `${filledPrompt}\nPlease keep your responses short, clear, and to the point.`;

      const res = await API.post("/ai/generate", {
        message: userMessage,
        personaPrompt: finalPrompt,
        chatId
      });

      const botReply = res.data.reply;

      setMessages((prev) => [
        ...prev,
        { sender: persona.name, content: botReply }
      ]);
    } catch (err) {
      console.error("AI reply error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: persona.name,
          content: "Hmm... I’m having trouble replying right now. Try again later!"
        }
      ]);
    } finally {
      setIsTyping(false); // Stop typing
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!persona || !chatId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-center text-xl text-gray-500 mb-4">
          Invalid access. Please start a chat again.
        </p>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-h-screen w-full bg-base-100">
      {/* Header */}
      <div className="flex items-center gap-4 h-14 p-4 shadow-md bg-base-100 border-b-1 border-gray-400 sticky top-16 z-10">
        <div className="avatar">
          <div className="w-11 rounded-full">
            <img src={persona.avatar} alt={persona.name} />
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-md">{persona.name}</h2>
          <p className="text-sm text-gray-500">AI Persona</p>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 mt-14 mb-10 space-y-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${
              msg.sender === user?.name ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-header text-xs font-medium mb-1 text-gray-400">
              {msg.sender}
            </div>
            <div className="chat-bubble bg-base-300 text-base-content text-sm mb-3">
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator after last message */}
        {isTyping && (
          <div className="chat chat-start">
            <div className="chat-header text-xs font-medium mb-1 text-gray-400">
              {persona.name}
            </div>
            <div className=" chat-bubble bg-base-200 text-gray-400 italic animate-pulse text-sm">
              Typing...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-base-300 bottom-0 fixed left-0 w-full">
        <div className="flex items-center gap-3 mx-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="input input-bordered w-full h-8 p-3 pb-4 rounded-lg"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="btn bg-[#636ae8] rounded-lg h-8"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
