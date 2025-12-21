import DefaultAvatar from "../../img/DefaultAvatar.png";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { sendMessage, loadMessages, loaddeal, confirmDeal } from "../../api.jsx";
import { supabase } from "../../supabaseClient.js";

export default function ChatWindow({ chatroom }) {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [dealInfo, setDealInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    if (!chatroom) return;
    if (!user) {
      return;
    }
    const initualMessages = async () => {
      setLoading(true);
      try {
        const loadedMessages = await loadMessages(chatroom.id);
        setMessages(loadedMessages || []);
      } catch (error) {
        console.error("Error loading messages:", error);
        setMessages([]);
      }
      try {
        const loadedDeal = await loaddeal(chatroom.id);
        setDealInfo(loadedDeal || null);
      } catch (error) {
        console.error("Error loading deal:", error);
        setDealInfo(null);
      } finally {
        setLoading(false);
      }
    };
    initualMessages();
  }, [chatroom, user]);
  console.log("deals info:", dealInfo);

  useEffect(() => {
    if (!chatroom) return;
    if (!user) return;
    const subscription = supabase
      .channel(`messages_room_${chatroom.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${chatroom.id}` }, (payload) => {
        console.log("New message received:", payload);
        setMessages((prevMessages) => [...prevMessages, payload.new]);

      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "deals", filter: `chat_room_id=eq.${chatroom.id}` }, (payload) => {
        console.log("Deal updated:", payload);
        setDealInfo(payload.new);
      })
      .subscribe((status) => {
        console.log(status);
        if (status === "SUBSCRIBED") {
          console.log(`Subscribed to messages for room ${chatroom.id}`);
        }
      });
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [chatroom, user]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    try {
      const { success, message } = await sendMessage(chatroom.id, newMessage);
      if (!success) {
        console.error("Failed to send message");
      }
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleConfirm = async (e) =>{
    // Implement deal confirmation logic here
    e.preventDefault();
    try {
      const { success, chatroom: updatedChatroom, deal: updatedDeal } = await confirmDeal(chatroom.id);
      if (!success) {
        console.error("Failed to confirm deal");
      }
    } catch (error) {
      console.error("Error confirming deal:", error);
    }
  }

  if (chatroom == null) {
    return (
      <div className="col-md-8">
        <p>Select a chatroom to start messaging.</p>
      </div>
    );
  }

  return (
    <div className="col-md-8">
      {/* Chat header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex">
          <img
            src={DefaultAvatar}
            className="rounded-circle me-2"
            alt="Profile"
            width={40}
            height={40}
          />
          <div>
            <div className="fw-bold">
              {user.id === chatroom.buyer_id
                ? chatroom.seller.user_name
                : chatroom.buyer.user_name}
            </div>
            <small className="text-muted">
              Discussing: {chatroom?.textbook?.title}
            </small>
          </div>
        </div>

        <div className="ms-3 flex-grow-1">
          <div className="card">
            <div className="card-body d-flex justify-content-between">
              <div>
                <p>Seller confirmed: {dealInfo?.seller_confirmed ? "Yes" : "No"}</p>
                <p>Buyer confirmed: {dealInfo?.buyer_confirmed ? "Yes" : "No"}</p>
              </div>
              <div>
                <p>Trade confirm</p>
                <div>
                  <button type="button" onClick={handleConfirm} className="btn btn-primary">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                  backgroundColor:
                    user.id === message.sender_id ? "#0d6efd" : "#1b2545",
                  color: "white",
                }}
              >
                <div className="card-body p-2">
                  <div className="small fw-bold mb-1">
                    {user.id === message.sender_id ? "You" : "Seller"}
                  </div>
                  <div className="mb-0">{message.message}</div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
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
