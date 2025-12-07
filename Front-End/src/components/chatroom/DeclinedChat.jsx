export default function DeclinedChat({ chatroom }) {
  return (
    <div className="flex-grow-1">
      <div className="fw-bold text-black">{chatroom.buyer ? chatroom.buyer.user_name : "Unknown User"}</div>
      <small className="text-muted">Book: {chatroom.textbook ? chatroom.textbook.title : "Unknown Book"}</small>
        <div className="mt-2">
            <span className="text-danger">This trade has been declined.</span>
        </div> 
    </div>
  );
}