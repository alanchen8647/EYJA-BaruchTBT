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