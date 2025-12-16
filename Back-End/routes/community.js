import Router from "express";
import {supabase} from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Endpoint to get community posts
router.get("/", requireAuth, async (req, res) => {
    const userId = req.user.id;
    try {
        const { data: communities, error } = await supabase
            .from("community_posts")
            .select(`*, profiles(user_name, avatar_url)`)
            .order('created_at', { ascending: false });
        if (error) throw error;
        res.json({ communities });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to create a community post
router.post("/", requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { title, content } = req.body;
    try {
        const { data, error } = await supabase
            .from("community_posts")
            .insert([{ user_id: userId, title, content }])
            .select()
            .single();
        if (error) throw error;
        res.json({ post: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id/comments", requireAuth, async (req, res) => {
    const postId = req.params.id;
    try {
        const { data: comments, error } = await supabase
            .from("comments")
            .select(`*, profiles(user_name, avatar_url)`)
            .eq("post_id", postId)
            .order('created_at', { ascending: true });
        if (error) throw error;
        res.json({ comments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/:id/comments", requireAuth, async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;
    const { content } = req.body;
    try {
        const { data, error } = await supabase
            .from("comments")
            .insert([{ user_id: userId, post_id: postId, content }])
            .select()
            .single();
        if (error) throw error;
        res.json({ comment: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;