import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Profile from "../../images/profile.png";

type Message = {
  from: "You" | "Seller";
  text: string;
};

function ChatPage() {
  const location = useLocation();
  const { book } = (location.state as any) || {};

  const sellerName = book?.contact || "Seller";
  const bookTitle = book?.title || "Textbook";

  const [messages, setMessages] = useState<Message[]>([
    {
      from: "Seller",
      text: `Hi, I'm the seller for "${bookTitle}". Let me know how you'd like to arrange the exchange.`,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: "You", text: trimmed }]);
    setNewMessage("");
  };

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

                <div className="list-group">
                  <div className="list-group-item d-flex align-items-center">
                    <img
                      src={Profile}
                      className="rounded-circle me-2"
                      alt="Profile"
                      width={40}
                      height={40}
                    />
                    <div>
                      <div className="fw-bold">{sellerName}</div>
                      <small className="text-muted">
                        Chat about: {bookTitle}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: chat window */}
          <div className="col-md-8">
            {/* Chat header */}
            <div className="d-flex align-items-center mb-3">
              <img
                src={Profile}
                className="rounded-circle me-2"
                alt="Profile"
                width={40}
                height={40}
              />
              <div>
                <div className="fw-bold">{sellerName}</div>
                <small className="text-muted">Discussing: {bookTitle}</small>
              </div>
            </div>

            {/* Messages area */}
            <div
              className="card mb-3"
              style={{ height: "350px", overflowY: "auto" }}
            >
              <div className="card-body">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`d-flex mb-3 ${
                      msg.from === "You"
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className="card"
                      style={{
                        maxWidth: "70%",
                        backgroundColor:
                          msg.from === "You" ? "#0d6efd" : "#1b2545",
                        color: "white",
                      }}
                    >
                      <div className="card-body p-2">
                        <div className="small fw-bold mb-1">{msg.from}</div>
                        <div className="mb-0">{msg.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input area – button spans its row */}
            <form onSubmit={handleSubmit}>
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
        </div>
      </div>
    </>
  );
}

export default ChatPage;
