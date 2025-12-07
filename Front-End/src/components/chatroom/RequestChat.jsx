import {useAuth} from "../../context/AuthContext.jsx";
import { acceptTrade, declineTrade } from "../../api.jsx";

export default function PendingTrade({chatroom}){
    const {user} = useAuth();

    const handleAccept = async (roomId) => {
        try {
            await acceptTrade(roomId);
        } catch (error) {
            console.error("Error accepting trade:", error);
        }
    }

    const handleDecline = async (roomId) => {
        try {
            await declineTrade(roomId);
        } catch (error) {
            console.error("Error declining trade:", error);
        }
    }

    return (
           <div className="flex-grow-1">
                    <div className="fw-bold text-black">{user.id === chatroom.buyer_id ? `waiting for ${chatroom.seller.seller_name} to accept` : `${chatroom.buyer.buyer_name} wants to trade`}</div>
                    <small className="text-muted">Book: {chatroom.textbook.title}</small>

                    {chatroom.buyer_id === user.id ? (
                        <div className="mt-2">
                            <span className="text-info">Waiting for seller to respond...</span>
                        </div> 
                        ) : (
                        <div className="mt-2">
                        <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleAccept(chatroom.id)}
                        >
                            Accept
                        </button>

                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDecline(chatroom.id)}
                        >
                            Decline
                        </button>
                        </div>
                    )}


                </div>
    );
}