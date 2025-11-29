import {createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config(); // LOAD ENV VARIABLES

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
console.log("Supabase URL:", supabaseUrl); // Debugging line
console.log("Supabase Key:", supabaseKey ? '********' : 'Not Set'); // Debugging line
export const supabase = createClient(supabaseUrl, supabaseKey);