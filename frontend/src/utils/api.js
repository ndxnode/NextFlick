import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchProfile() {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
}

export async function updateProfile(profileData) {
  try {
    const response = await api.put("/users/profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Profile update error:", error);
    throw error;
  }
}

export async function updatePassword(passwordData) {
  try {
    const response = await api.post("/users/password", passwordData);
    return response.data;
  } catch (error) {
    console.error("Password update error:", error);
    throw error;
  }
}

export async function updateProfilePicture(formData) {
  try {
    const response = await api.post("/users/profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Profile picture update error:", error);
    throw error;
  }
}

export async function getWatchlist() {
  try {
    const response = await api.get("/users/watchlist");
    return response.data;
  } catch (error) {
    console.error("Watchlist fetch error:", error);
    throw error;
  }
}

export default api;
