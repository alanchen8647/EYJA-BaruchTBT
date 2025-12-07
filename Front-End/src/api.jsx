
import { supabase } from "./supabaseClient.js";

// API utility functions for textbook operations
const API = {
  // Base URL of the backend API
  baseUrl: "http://localhost:3000/",}

// Fetch the list of textbooks from the backend
export async function getTextbookList() {
    const res = await fetch(`${API.baseUrl}textbooks`);
    if (!res.ok) {
        throw new Error("Failed to fetch textbook list");
    }
    const data = await res.json();
    return data;
}

// Fetch details of a specific textbook by its ID
export async function getTextbookById(id) {
    const res = await fetch(`${API.baseUrl}textbooks/${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch textbook details");
    }
    const data = await res.json();
    return data;
}

// Create a new textbook entry in the backend
export async function createTextbook(formData) {
    const res = await fetch(`${API.baseUrl}textbooks/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    if (!res.ok) {
        throw new Error("Failed to create textbook");
    }
    const data = await res.json();
    console.log(data);
    const imageURL = []
    for (const image of formData.bookImages){
        const uploadRes = await uploadImages(image, data.id);
        imageURL.push(uploadRes.url);
    }

    await updateItemImages(data.id, imageURL);
    
    return data;
}

// Update textbook images URLs in the backend
const updateItemImages = async (textbookId, imageURLs) => {
    const res = await fetch(`${API.baseUrl}textbooks/${textbookId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ images_url: imageURLs }),
    });
}

// Upload images to Supabase storage and return their public URLs
const uploadImages = async (imageFile, textbookId) => {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${textbookId}/${Date.now()}.${fileExt}`;

    const {data, error} = await supabase.storage
    .from(`textbook_img`)
    .upload(fileName, imageFile);

    if (error) {
        throw new Error("Image upload failed");
    }

    const {data: publicURLData} = await supabase.storage
    .from(`textbook_img`)
    .getPublicUrl(fileName);
    console.log("Public URL:", publicURLData.publicUrl);

    return { url: publicURLData.publicUrl };
}

export async function expressInterest(buyerId, sellerId, textbookId) {
    const res = await fetch(`${API.baseUrl}trade/request`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${await supabase.auth.getSession().then(({data}) => data.session?.access_token)}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ buyer_id: buyerId, seller_id: sellerId, textbook_id: textbookId }),
    });
    if (!res.ok) {
        throw new Error("Failed to express interest");
    }
    const data = await res.json();
    return data;
}

export async function getChatrooms(token) {
    const res = await fetch(`${API.baseUrl}chatroom/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.chatrooms;
}

export async function acceptTrade(chatRoomId) {
    const res = await fetch(`${API.baseUrl}trade/accept`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${await supabase.auth.getSession().then(({data}) => data.session?.access_token)}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_room_id: chatRoomId }),
    });
    if (!res.ok) {
        throw new Error("Failed to accept trade");
    }
    const data = await res.json();
    return data;
}

export async function declineTrade(chatRoomId) {
    const res = await fetch(`${API.baseUrl}trade/decline`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${await supabase.auth.getSession().then(({data}) => data.session?.access_token)}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_room_id: chatRoomId }),
    });
    if (!res.ok) {
        throw new Error("Failed to decline trade");
    }
    const data = await res.json();
    return data;
}

export async function sendMessage(roomId, message) {
    const res = await fetch(`${API.baseUrl}message/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${await supabase.auth.getSession().then(({data}) => data.session?.access_token)}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ room_id: roomId, message: message }),
    });
    if (!res.ok) {
        throw new Error("Failed to send message");
    }
    const data = await res.json();
    return data;
}

export async function resetUnread(chatRoomId) {
    const token = await supabase.auth.getSession().then(({data}) => data.session?.access_token);
    const res = await fetch(`${API.baseUrl}message/read`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_room_id: chatRoomId }),
    });
    if (!res.ok) {
        throw new Error("Failed to reset unread count");
    }
    const data = await res.json();
    return data;
}

export async function loadMessages(roomId) {
    const token = await supabase.auth.getSession().then(({data}) => data.session?.access_token);
    const res = await fetch(`${API.baseUrl}message/load`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ room_id: roomId }),
    });
    if (!res.ok) {
        throw new Error("Failed to load messages");
    }
    const data = await res.json();
    return data.messages;
}