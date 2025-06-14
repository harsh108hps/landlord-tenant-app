// src/pages/Chatbot.jsx
import { useState } from "react";
import axios from "axios";
import { ref, push } from "firebase/database";
import { database, auth } from "../firebase";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user", content: query };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setQuery("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: newMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botReply = response.data.choices[0].message;
      const updatedMessages = [...newMessages, botReply];
      setMessages(updatedMessages);

      const chatRef = ref(database, `chatHistory/${auth.currentUser?.uid}`);
      await push(chatRef, {
        user: query,
        bot: botReply.content,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("❌ Axios Chatbot Error:", error.response?.data || error.message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Sorry, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">
        🤖 AI Assistant Chat
      </h2>

      <div className="bg-white shadow-lg rounded-lg p-6 h-[500px] overflow-y-auto mb-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs p-3 rounded-xl shadow-md text-sm whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>
              <p className="mt-1">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 italic text-center">Bot is typing...</div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something like 'How to request maintenance?'"
          className="flex-grow p-3 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
