import {createContext, useContext, useState, useEffect} from 'react';
import {supabase} from '../supabaseClient.js';

const AuthContext = createContext();

export function AuthProvider ({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setUser(session?.user ?? null);
      setAuthToken(session?.access_token ?? null);
      setLoading(false);
    });
    const {data: authListener} = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setAuthToken(session?.access_token ?? null);
      setLoading(false);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{user, loading, authToken}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);