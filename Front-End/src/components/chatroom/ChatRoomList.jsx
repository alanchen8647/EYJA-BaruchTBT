import ChatListItem from "./ChatListItem.jsx";

export default function ChatList( {chatrooms , setCurrentChatroom}) {
    return (
        <>
            {chatrooms?.length === 0 ? (
                <p>No chat rooms available.</p>
            ) : (
                chatrooms.map((chatroom) => (
                    <ChatListItem
                        key={chatroom.id}
                        chatroom={chatroom}
                        setCurrentChatroom={setCurrentChatroom}
                    />
                ))
            )}
        </>
    );
}