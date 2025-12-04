
import { supabase } from "./supabaseClient.js";
const API = {
  // Base URL of the backend API
  baseUrl: "http://localhost:3000/",}

export async function getTextbookList() {
    const res = await fetch(`${API.baseUrl}textbooks`);
    if (!res.ok) {
        throw new Error("Failed to fetch textbook list");
    }
    const data = await res.json();
    return data;
}

export async function getTextbookById(id) {
    const res = await fetch(`${API.baseUrl}textbooks/${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch textbook details");
    }
    const data = await res.json();
    return data;
}

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

const updateItemImages = async (textbookId, imageURLs) => {
    const res = await fetch(`${API.baseUrl}textbooks/${textbookId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ images_url: imageURLs }),
    });
}

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