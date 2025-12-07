import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Profile from "../../images/profile.png";
import { supabase } from "../supabaseClient.js";
import { getChatrooms } from "../api.jsx";
import ChatList from "../components/chatroom/ChatRoomList.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import ChatWindow from "../components/chatroom/ChatWindow.jsx";
import { resetUnread } from "../api.jsx";

type Message = {
  from: "You" | "Seller";
  text: string;
};

function ChatPage() {
  const [chatrooms, setChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState(null);
  const { user, loading } = useAuth();
  async function loadChats() {
    const token = (await supabase.auth.getSession()).data.session?.access_token;
    if (token) {
      const chatrooms = await getChatrooms(token);
      setChatrooms(chatrooms);
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    loadChats();
    const channel = supabase
      .channel("chat_room_updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_room",
          filter: `buyer_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Buyer update received:", payload);
          loadChats();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_room",
          filter: `seller_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Seller update received:", payload);
          loadChats();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_room_user_status",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Seller update received:", payload);
          loadChats();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user,loading]);

  useEffect(() => {
    async function reset() {
      if (currentChatroom) {
          await resetUnread(currentChatroom?.id);
          setChatrooms((prevChatrooms) =>
            prevChatrooms.map((chatroom) =>
              chatroom.id === currentChatroom.id
                ? { ...chatroom, unread_count: 0 }
                : chatroom
            )
          );
      }
    }
    reset();
    console.log("Current chatroom changed:", currentChatroom);
  }, [currentChatroom]);
  console.log(chatrooms);

  if (!user) {
    return <p>Please log in to access your chats.</p>;
  }

  return (
    <>
      <div className="container my-5">
        <div className="row">
          {/* Left sidebar: conversation list */}
          <div className="col-md-4 mb-4">
            <div className="card" style={{ backgroundColor: "#0b1530" }}>
              <div className="card-body text-white">
                <h5 className="card-title mb-3">Chats</h5>

                <div className="mb-3">
                  <input
                    className="form-control form-control-sm"
                    placeholder="Search"
                    disabled
                  />
                </div>

                <ChatList chatrooms={chatrooms} setCurrentChatroom={setCurrentChatroom} />

              </div>
            </div>
          </div>

          {/* Right side: chat window */}
          <ChatWindow chatroom={currentChatroom} />
        </div>
      </div>
    </>
  );
}

export default ChatPage;
