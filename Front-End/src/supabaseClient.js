import {createClient} from '@supabase/supabase-js';
console.log(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
  ,{
    realtime: {
      params: {
        eventsPerSecond: 10,  // REQUIRED for some browsers/environments
      },
    },
  }
);