import {supabase} from '../db.js';

export const authenticateToken = async (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token){
        return res.status(401).json({ error: 'Access token Required' });
    }

    try {
        const {data:{user},error} = await supabase.auth.getUser(token);
        if (error) throw error;
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token' });
    }
}

export const requireAuth = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'No authorization header provided' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Invalid authorization header format' });
        }

        const {data,error} = await supabase.auth.getUser(token);

        if (error || !data.user) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        req.user = data.user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}