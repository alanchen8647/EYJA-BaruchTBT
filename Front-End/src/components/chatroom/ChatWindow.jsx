import DefaultAvatar from "../../img/DefaultAvatar.png";
import { useEffect, useState } from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import { sendMessage , loadMessages} from "../../api.jsx";
import { supabase } from "../../supabaseClient.js";

export default function ChatWindow({ chatroom }) {
  const [newMessage, setNewMessage] = useState("");
  const {user} = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatroom) {
      loadMessages(chatroom.id).then((loadedMessages) => {
        setMessages(loadedMessages);
      });
    } else {
      setMessages([]);
    }
    const channel = supabase
      .channel(`chatroom-${chatroom?.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${chatroom?.id}` }, (payload) => {
        setMessages((prevMessages) => [...prevMessages, payload.new]);
      }).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatroom]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    try {
      const {success ,message}=await sendMessage(chatroom.id, newMessage);
      if (success) {
        setMessages((prevMessages) => [...prevMessages, message]);
      } else {
        console.error("Failed to send message");
      }
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!chatroom) {
    return (
      <div className="col-md-8">
        <p>Select a chat to start messaging.</p>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="col-md-8">
        <p>Please log in to participate in the chat.</p>
      </div>
    );
  }

  return (
    <div className="col-md-8">
      {/* Chat header */}
      <div className="d-flex align-items-center mb-3">
        <img
          src={DefaultAvatar}
          className="rounded-circle me-2"
          alt="Profile"
          width={40}
          height={40}
        />
        <div>
          <div className="fw-bold">{user.id === chatroom.buyer_id ? chatroom.seller.user_name : chatroom.buyer.user_name}</div>
          <small className="text-muted">Discussing: {chatroom?.textbook?.title}</small>
        </div>
      </div>

      {/* Messages area */}
      <div className="card mb-3" style={{ height: "350px", overflowY: "auto" }}>
        <div className="card-body">
          {messages.map((message, key) => (
            <div
              key={key}
              className={`d-flex mb-3 ${
                user.id === message.sender_id
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className="card"
                style={{
                  maxWidth: "70%",
                  backgroundColor: user.id === message.sender_id ? "#0d6efd" : "#1b2545",
                  color: "white",
                }}
              >
                <div className="card-body p-2">
                  <div className="small fw-bold mb-1">{user.id === message.sender_id ? "You" : "Seller"}</div>
                  <div className="mb-0">{message.message}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input area – button spans its row */}
      <form onSubmit={handleSendMessage}>
        <div className="row g-2">
          <div className="col-12">
            <textarea
              className="form-control"
              rows={2}
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
