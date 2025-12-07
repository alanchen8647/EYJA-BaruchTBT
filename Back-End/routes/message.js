import {Router} from "express";
import {supabase} from "../db.js";
import {requireAuth} from "../middleware/auth.js";

const router = Router();

//Endpoint to send a message in a chat room
router.post("/", requireAuth, async (req, res) => {
    const {room_id, message} = req.body;
    const sender_id = req.user.id;

    try {
        const {data, error} = await supabase.from("messages").insert({
            room_id,
            sender_id,
            message: message
        }).select().single();

        const {updateError } = await supabase.from("chat_room").update({
            last_message: data.id
        }).eq("id", room_id);
            if (updateError) throw updateError;

        const {data:room} = await supabase
            .from("chat_room")
            .select("buyer_id,seller_id")
            .eq("id", room_id)
            .single();
        
        const recipient_id = room.buyer_id === sender_id ? room.seller_id : room.buyer_id;

        await supabase.rpc("increment_unread",{
            _chat_room_id: room_id,
            _user_id: recipient_id
        })

        if (error) throw error;
        res.json({ success: true, message: data});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/load", requireAuth, async (req, res) => {
    const {room_id} = req.body;
    const user_id = req.user.id;
    try {
        const {data, error} = await supabase
            .from("messages")
            .select(`*, profiles(user_name)`)
            .eq("room_id", room_id)
            .order("created_at", {ascending: true});
        if (error) throw error;
        res.json({ messages: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/read", requireAuth, async (req, res) => {
    const {chat_room_id} = req.body;
    const user_id = req.user.id;

    const {error} = await supabase
        .from("chat_room_user_status")
        .update({unread_count: 0, last_read_at: new Date().toISOString()})
        .eq("chat_room_id", chat_room_id)
        .eq("user_id", user_id);
    if (error) {
        return res.status(500).json({error: error.message});
    }
    res.json({ success: true });
});

export default router;