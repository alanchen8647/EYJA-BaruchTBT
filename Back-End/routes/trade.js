import { Router } from "express";
import { supabase } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Endpoint to express interest in a trade (create chat room)
router.post("/request", requireAuth, async (req, res) => {
    const {buyer_id, seller_id, textbook_id } = req.body;
    try {
        const {data: room, error: roomError} = await supabase
            .from("chat_room")
            .insert([{ buyer_id, seller_id, textbook_id, status: 'pending' }])
            .select().single();
        if (roomError) return res.status(500).json({ error: roomError.message });

        await supabase.from("messages").insert({
        room_id: room.id,
        sender_id: buyer_id,
        message: "Hi, I'm interested in this textbook! Would you like to start a trade?",
        });

        await supabase.from("deals").insert({
        chat_room_id: room.id,
        textbook_id,
        status: "pending",
        });

        const { data: userStatus, error: userStatusError } = await supabase.from("chat_room_user_status").insert([
            { chat_room_id: room.id, user_id: buyer_id},
            { chat_room_id: room.id, user_id: seller_id}
        ]);
        if (userStatusError) return res.status(500).json({ error: userStatusError.message });


        res.json({ success: true ,chatroom: room });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/accept", requireAuth, async (req, res) => {
    const { chat_room_id } = req.body;
    const seller_id = req.user.id;

    try {
        const { data: room, error: roomError } = await supabase
            .from("chat_room")
            .update({ status: 'active' })
            .eq("id", chat_room_id)
            .eq("seller_id", seller_id)
            .select()
            .single();
        
        const { data: deal, error: dealError } = await supabase
            .from("deals")
            .update({ status: 'active' })
            .eq("chat_room_id", chat_room_id)
            .select()
            .single();

        if (roomError) return res.status(500).json({ error: roomError.message });
        if (dealError) return res.status(500).json({ error: dealError.message });

        res.json({ success: true, chatroom: room, deal: deal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/decline", requireAuth, async (req, res) => {
    const { chat_room_id } = req.body;
    const seller_id = req.user.id;
    try {
        const { data: room, error: roomError } = await supabase
            .from("chat_room")
            .update({ status: 'declined' })
            .eq("id", chat_room_id)
            .eq("seller_id", seller_id)
            .select()
            .single();
        const { data: deal, error: dealError } = await supabase
            .from("deals")
            .update({ status: 'declined' })
            .eq("chat_room_id", chat_room_id)
            .select()
            .single();
        if (roomError) return res.status(500).json({ error: roomError.message });
        if (dealError) return res.status(500).json({ error: dealError.message });
        res.json({ success: true, chatroom: room, deal: deal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;