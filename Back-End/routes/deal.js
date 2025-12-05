import { supabase } from "../db.js";
import { Router } from "express";

const router = Router();

// Express interest in a textbook
router.post("/", async (req, res) => {
    const { buyer_id, seller_id, textbook_id} = req.body;
    try {
        const { data, error } = await supabase.from("deals").insert([{
            buyer_id,
            seller_id,
            textbook_id,
            status: "pending"
        }]).select().single();
        if (error) {
            throw error;
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all trade interests where given user is buyer or seller in most recent order
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const { data, error } = await supabase
            .from("deals")
            .select(`*, textbooks(*, profiles(user_name)), profiles!buyer_id_fkey(user_name)`)
            .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
            .order('created_at', { ascending: false });
        if (error) {
            throw error;
        }
        res.json({ interests: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;