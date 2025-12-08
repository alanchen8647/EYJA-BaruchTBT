declare module '*.jsx';
declare module '*.js';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';

declare module '../context/AuthContext.jsx' {
    export const useAuth: () => any;
    export const AuthProvider: any;
}

declare module '../supabaseClient.js' {
    export const supabase: any;
}

declare module '../api.jsx' {
    export const getChatrooms: (token: any) => Promise<any>;
    export const getTextbookList: () => Promise<any>;
    export const getTextbookById: (id: any) => Promise<any>;
    export const createTextbook: (data: any) => Promise<any>;
    export const expressInterest: (userId: any, sellerId: any, textbookId: any) => Promise<any>;
    export const resetUnread: (chatroomId: any) => Promise<any>;
}

declare module '../components/textbookimgcarasol.jsx';
