import {useAuth} from "../../context/AuthContext.jsx";
export default function ActiveChat ({ chatroom }) {
  console.log("ActiveChat chatroom:", chatroom);
    const {user} = useAuth();
    const otherUserName = user.id === chatroom.buyer_id ? chatroom.seller.user_name : chatroom.buyer.user_name;
    const bookTitle = chatroom.textbook ? chatroom.textbook.title : "Unknown Book";
    const lastMessage = chatroom.lm ? chatroom.lm.message
        : null;
  return (
    <>
            <div className="flex-grow-1">
                <div className="fw-bold text-black">{otherUserName}</div>

                <small className="text-muted d-block">
                Chat about: {bookTitle}
                </small>

                {lastMessage && (
                <small className="text-secondary text-truncate d-block" style={{ maxWidth: "230px" }}>
                    {lastMessage}
                </small>
                )}
            </div>
    </>
  )
}