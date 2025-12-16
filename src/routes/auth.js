import { supabase } from '../db.js';
import { Router } from 'express';
const router = Router();

// Registration route
router.get('/', async (req, res) => {
  const { data, error } = await supabase
     .from('profiles')
     .select('*')

  if (error) return res.status(400).json({ error })
  res.json(data)
})

export default router;