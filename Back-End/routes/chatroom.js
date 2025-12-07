import {Router} from 'express';
import {supabase} from '../db.js';
import {requireAuth} from '../middleware/auth.js';

const router = Router();
// Endpoint to get chat rooms for a user
router.post("/", requireAuth, async (req, res) => {
    const user_id = req.user.id;
    
    try {
        // Get chat rooms
        const { data: chatRooms, error } = await supabase
            .from("chat_room")
            .select(`
                id,
                buyer_id,
                seller_id,
                buyer: profiles!buyer_id (user_name, avatar_url),
                seller: profiles!seller_id (user_name, avatar_url),
                textbook: textbooks (title, price, images_url),
                status,
                created_at,
                deals(id, textbook_id),
                last_message,
                lm: messages!last_message (message, sender_id, created_at, id)
            `)
            .or(`buyer_id.eq.${user_id}, seller_id.eq.${user_id}`)
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (!chatRooms?.length) return res.json({ chatrooms: [] });

        // Get additional data in parallel
        const chatRoomIds = chatRooms.map(r => r.id);
        
        const [
            { data: userStatuses },
        ] = await Promise.all([
            supabase
                .from('chat_room_user_status')
                .select('*')
                .eq('user_id', user_id)
                .in('chat_room_id', chatRoomIds),
        ]);

        // Process data
        const chatrooms = chatRooms.map(room => {
            const userStatus = userStatuses?.find(s => s.chat_room_id === room.id);
            
            
            return {
                ...room,
                user_status: userStatus || { unread_count: 0, last_read_at: null },
                unread_count: userStatus?.unread_count || 0
            };
        });

        // Sort by last message time
        chatrooms.sort((a, b) => {
            const timeA = a.last_message?.[0]?.created_at || a.created_at;
            const timeB = b.last_message?.[0]?.created_at || b.created_at;
            return new Date(timeB) - new Date(timeA);
        });

        res.json({ chatrooms });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;