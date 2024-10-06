import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";
import "./FarmerAssistant.css";
import farmerAvatar from "./IMG-20240901-WA0016.jpg";

function FarmerAssistant() {
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false); // For loading state

  // Handle text chat submission
  const handleTextChat = async (event) => {
    event.preventDefault();
    const userMessage = event.target.userMessage.value.trim();
    if (!userMessage) return;

    event.target.userMessage.value = "";

    // Append user message to the chat
    setChatMessages((prevMessages) => [...prevMessages, { sender: "user", text: userMessage }]);

    try {
      setLoading(true);

      // Send user message to the backend
      const response = await axios.post("http://localhost:4000/mega-assistant", {
        message: userMessage,
      });

      // Append the assistant's response to the chat
      const assistantMessage = response.data.assistantMessage;
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: "assistant", text: assistantMessage },
      ]);
    } catch (error) {
      console.error("Error fetching assistant response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h1>Farmer Assistant</h1>

      {/* 2D Avatar */}
      <Avatar
        alt="Farmer Assistant"
        src={farmerAvatar}
        sx={{ width: 150, height: 150, marginBottom: "20px" }}
      />

      {/* Chat Window */}
      <div className="chat-window">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`chat-bubble ${message.sender === "user" ? "user" : "assistant"}`}
          >
            <strong>{message.sender === "user" ? "You" : "Assistant"}: </strong>
            {message.text}
          </div>
        ))}
      </div>

      {/* Form to chat via text */}
      <form onSubmit={handleTextChat} className="chat-input-form">
        <input
          name="userMessage"
          type="text"
          className="chat-input"
          placeholder="Type your message here..."
          disabled={loading}
        />
        <button type="submit" className="send-button" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

function Alerts() {
  return (
    <BaseLayout
      title="Farmer Assistant"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/farmer-assistant" },
        { label: "Farmer Assistant" },
      ]}
    >
      <View title="Animated Farmer Assistant Chat">
        <FarmerAssistant />
      </View>
    </BaseLayout>
  );
}

export default Alerts;
