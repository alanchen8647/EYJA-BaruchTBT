import { supabase } from "../db.js";
import { Router } from "express";

const router = Router();

// Get all textbooks
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("textbooks").select(`*,profiles(user_name)`).eq('status', 'available').order('created_at', { ascending: false });
    if (error) throw error; 
    res.json({ textbooks: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("textbooks")
      .select(`*,profiles(user_name)`)
      .eq("id", id)
      .single();
    if (error) throw error;
    res.json({ textbook: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { title, author, subject,status, course_num, condition, price, seller_id, description} = req.body;
  try {
    const { data, error } = await supabase.from("textbooks").insert([{
      title,
      author,
      subject,
      course_num,
      condition,
      status: "available",
      description,
      price,
      seller_id
    }]).select().single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const { data, error } = await supabase
      .from("textbooks")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    res.json({ textbook: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;