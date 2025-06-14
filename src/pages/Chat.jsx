import { useState, useEffect } from "react";
import { auth, database } from "../firebase";
import { ref, onValue, push, set } from "firebase/database";

const ChatPage = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const senderId = auth.currentUser.uid;
  const chatId = [senderId, receiverId].sort().join("_");

  useEffect(() => {
    const msgRef = ref(database, `chats/${chatId}/messages`);
    onValue(msgRef, (snapshot) => {
      const data = snapshot.val() || {};
      const msgArray = Object.values(data);
      setMessages(msgArray);
    });
  }, [chatId]);

  const sendMessage = () => {
    const msgRef = push(ref(database, `chats/${chatId}/messages`));
    set(msgRef, {
      senderId,
      text,
      timestamp: Date.now(),
      seen: false
    });
    setText("");
  };

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <div className="bg-white p-4 shadow h-[80vh] overflow-y-scroll rounded">
        {messages.map((msg, i) => (
          <div key={i} className={`my-2 ${msg.senderId === senderId ? 'text-right' : 'text-left'}`}>
            <p className={`inline-block px-4 py-2 rounded-lg ${msg.senderId === senderId ? 'bg-green-200' : 'bg-blue-200'}`}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-grow p-2 border rounded"
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
