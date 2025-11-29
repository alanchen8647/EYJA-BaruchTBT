import { supabase } from "../db.js";
import { Router } from "express";

const router = Router();

// Get all textbooks
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("textbooks").select(`*,profiles(user_name)`).order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ textbooks: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;