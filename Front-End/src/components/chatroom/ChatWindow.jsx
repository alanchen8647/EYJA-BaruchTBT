import DefaultAvatar from "../../img/DefaultAvatar.png";
import { useEffect, useState, useRef } from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import { sendMessage , loadMessages} from "../../api.jsx";
import { supabase } from "../../supabaseClient.js";

export default function ChatWindow({ chatroom }) {
  const [newMessage, setNewMessage] = useState("");
  const {user} = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);


  useEffect(() => {
      if (!chatroom) return;
      if (!user) { return; }
      const initualMessages = async () => {
        setLoading(true);
        try{
            const loadedMessages = await loadMessages(chatroom.id);
            setMessages(loadedMessages || []);
        } catch (error){
            console.error("Error loading messages:", error);
            setMessages([]);
        } finally {
            setLoading(false);
        }
      }
      initualMessages();
  }, [chatroom, user]);

  useEffect (() => {
    if (!chatroom) return;
    if (!user) { return; }
    const channel = supabase
      .channel(`chatroom-${chatroom.id}`, {
      config: {
        broadcast: { self: true } 
      }
    })
      .on(
      'postgres_changes',
      { 
        event: 'INSERT',  // Only listen for INSERT events (new messages)
        schema: 'public', 
        table: 'messages', 
        filter: `room_id=eq.${chatroom.id}` 
      }, 
      (payload) => {
        console.log('New message received:', payload.new);
        
        setMessages(prev => {
          // Prevent duplicates - check if message already exists
          const exists = prev.some(msg => 
            msg.id === payload.new.id || 
            (msg.created_at === payload.new.created_at && 
             msg.sender_id === payload.new.sender_id &&
             msg.message === payload.new.message)
          );
          
          if (exists) {
            console.log('Duplicate message detected, skipping');
            return prev;
          }
          
          console.log('Adding new message to state');
          return [...prev, payload.new];
        });
      }
    )
    .on(
      'postgres_changes',
      { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'messages', 
        filter: `room_id=eq.${chatroom.id}` 
      }, 
      (payload) => {
        console.log('Message updated:', payload.new);
        // Handle message updates if needed
        setMessages(prev => 
          prev.map(msg => 
            msg.id === payload.new.id ? payload.new : msg
          )
        );
      }
    ).subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log(`Subscribed to chatroom-${chatroom.id} channel`);
          }
        });

    return () => {
      supabase.removeChannel(channel);
    };
    }, [chatroom, user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    try {
      const {success ,message}=await sendMessage(chatroom.id, newMessage);
      if (!success){
        console.error("Failed to send message");
      } else {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
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
