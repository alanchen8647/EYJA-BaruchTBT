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

//get deal info for a chatroom
router.get("/deal/:chat_room_id", requireAuth, async (req, res) => {
    const { chat_room_id } = req.params;
    try {
        const { data: deal, error } = await supabase
            .from("deals")
            .select("*")
            .eq("chat_room_id", chat_room_id)
            .single();
        if (error) throw error;
        res.json({ deal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//update deal confirmation status, update status and confirmed at timestamp if both parties have confirmed
router.post("/deal/confirm", requireAuth, async (req, res) => {
    const { chat_room_id } = req.body;
    const user_id = req.user.id;

    try {
        // 1. Get chat room and verify user is participant
        const { data: room, error: roomError } = await supabase
            .from("chat_room")
            .select("buyer_id, seller_id, textbook_id")
            .eq("id", chat_room_id)
            .single();
        
        if (roomError) throw roomError;
        if (!room) throw new Error("Chat room not found");
        
        const user_role = room.buyer_id === user_id ? 'buyer' : 
                         room.seller_id === user_id ? 'seller' : null;
        
        if (!user_role) throw new Error("User not authorized for this chat room");

        // 2. Get current deal status WITH FOR UPDATE (if your DB supports it)
        const { data: dealCheck, error: dealCheckError } = await supabase
            .from("deals")
            .select("buyer_confirmed, seller_confirmed, status")
            .eq("chat_room_id", chat_room_id)
            .single();
        
        if (dealCheckError) throw dealCheckError;
        if (!dealCheck) throw new Error("Deal not found");
        
        // 3. Check if already confirmed by this user
        if ((user_role === 'buyer' && dealCheck.buyer_confirmed) ||
            (user_role === 'seller' && dealCheck.seller_confirmed)) {
            return res.status(400).json({ error: "Already confirmed by this user" });
        }

        // 4. Prepare update data
        const updateData = {};
        if (user_role === 'buyer') {
            updateData.buyer_confirmed = true;
        } else {
            updateData.seller_confirmed = true;
        }

        // 5. Check if both parties will be confirmed after this update
        const willBuyerConfirm = user_role === 'buyer' || dealCheck.buyer_confirmed;
        const willSellerConfirm = user_role === 'seller' || dealCheck.seller_confirmed;
        
        if (willBuyerConfirm && willSellerConfirm) {
            updateData.status = 'completed';
            updateData.completed_at = new Date().toISOString();
        }

        // 6. Update deal (consider using transaction if possible)
        const { data: deal, error: updateError } = await supabase
            .from("deals")
            .update(updateData)
            .eq("chat_room_id", chat_room_id)
            .select()
            .single();
        
        if (updateError) throw updateError;

        // 7. Only update chat room and textbook if deal is completed
        if (deal.status === 'completed') {
            const [{ error: roomError }, { error: textbookError }] = await Promise.all([
                supabase
                    .from("chat_room")
                    .update({ status: 'completed' })
                    .eq("id", chat_room_id),
                
                supabase
                    .from("textbooks")
                    .update({ status: 'sold' })
                    .eq("id", room.textbook_id)
            ]);

            if (roomError) throw roomError;
            if (textbookError) throw textbookError;
        }

        res.json({ deal });
    } catch (error) {
        console.error("Deal confirm error:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;