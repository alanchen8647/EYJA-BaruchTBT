import DefaultAvatar from "../../img/DefaultAvatar.png";
import PendingTrade from "./RequestChat.jsx";
import ActiveTrade from "./ActiveChat.jsx";
import DeclinedTrade from "./DeclinedChat.jsx";

export default function ChatListItem({ chatroom, setCurrentChatroom }) {
  return (<>
          {/* If chat is active, set the chat to clickable and on click open the chat window */}
          {chatroom.status === 'active' || chatroom.status === 'completed' ? (
            <a onClick={() => setCurrentChatroom(chatroom)} style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}>
            <div className="list-group-item d-flex align-items-start bg-warning-subtle border border-warning rounded mb-2 p-3">
                {chatroom.unread_count > 0 ? (
                    <div className="position-absolute top-2 end-0 translate-middle">
                    <span className="badge rounded-circle bg-danger d-flex align-items-center justify-content-center"
                            style={{
                            width: '24px',
                            height: '24px',
                            fontSize: '0.75rem',
                            transform: 'translate(50%, -50%)'
                            }}>
                        {chatroom.unread_count > 9 ? '9+' : chatroom.unread_count}
                    </span>
                    </div>
                ) : null}
                <img
                    src={DefaultAvatar}
                    className="rounded-circle me-3"
                    alt="Profile"
                    width={45}
                    height={45}
                />
                    <ActiveTrade chatroom={chatroom} />
            </div>
            </a>
          ) : (
            <div className="list-group-item d-flex align-items-start bg-warning-subtle border border-warning rounded mb-2 p-3">
                <img
                    src={DefaultAvatar}
                    className="rounded-circle me-3"
                    alt="Profile"
                    width={45}
                    height={45}
                />
                {chatroom.status === 'pending' ? (
                    <PendingTrade chatroom={chatroom} />
                ) :chatroom.status === 'declined' ? (
                    <DeclinedTrade chatroom={chatroom} />
                ) : null}
            </div>
          )}
            
      </>
  );
}
