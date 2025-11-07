import React, { useState } from "react";
import axios from "axios";
import "../styles/inputform.css";

const InputForm = ({ setPreview }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Enter any text and I will detect & mask personal information." }
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/api/mask", { text: input });
      setPreview(res.data);
    } catch (error) {
      alert("Error contacting backend");
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">PII Detection Chatbot</div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-msg ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          className="chat-input"
          placeholder="Type something…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button className="send-btn" onClick={sendMessage}>
          ↑
        </button>
      </div>
    </div>
  );
};

export default InputForm;
