import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // ✅ Import CSS

const API_URL = "https://myaiapp-backend.onrender.com/api/messages"; // ✅ Correct backend endpoint

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
      if (!input.trim()) return; // Prevent empty messages
  
      try {
          const userMessage = { sender: "User", text: input };
  
          // ✅ Send to backend
          const res = await axios.post(API_URL, userMessage);
  
          // ✅ Update state with API response
          setMessages((prev) => [...prev, ...res.data]);
  
          setInput(""); // Clear input field
      } catch (error) {
          console.error("❌ Error sending message:", error);
      }
  };
  
    return (
        <div className="chat-container">
            <h2>AI Messaging App</h2>

            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`message ${msg.sender === "Bot" ? "bot-msg" : "user-msg"}`}
                    >
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default App;
