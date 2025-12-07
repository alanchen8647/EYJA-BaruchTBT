import {createContext, useContext, useState, useEffect} from 'react';
import {supabase} from '../supabaseClient.js';

//Context provider for authentication state using Supabase.
const AuthContext = createContext();


//Provides authentication context to child components.
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
//Custom hook to access authentication context.
export const useAuth = () => useContext(AuthContext);