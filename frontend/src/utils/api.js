import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (userData) => {
  try {
    const response = await api.post("/api/auth/register", {
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      email: userData.email,
      password: userData.password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error.response?.data?.message || "Registration failed";
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export async function fetchProfile() {
  try {
    const response = await api.get("/api/users/profile");
    return response.data;
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
}

export async function updateProfile(profileData) {
  try {
    const response = await api.patch("/api/users/profile", profileData);
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

// Watchlist API functions
export const getWatchlist = async () => {
  const response = await axios.get("/api/watchlist", { withCredentials: true });
  return response.data;
};

export const addToWatchlist = async (mediaId, mediaType, status = "planning") => {
  const response = await axios.post(
    "/api/watchlist/items",
    { mediaId, mediaType, status },
    { withCredentials: true }
  );
  return response.data;
};

export const updateWatchlistItem = async (mediaId, updates) => {
  const response = await axios.patch(
    `/api/watchlist/items/${mediaId}`,
    updates,
    { withCredentials: true }
  );
  return response.data;
};

export const removeFromWatchlist = async (mediaId) => {
  const response = await axios.delete(
    `/api/watchlist/items/${mediaId}`,
    { withCredentials: true }
  );
  return response.data;
};

export const getWatchlistByStatus = async (status) => {
  const response = await axios.get(
    `/api/watchlist/status/${status}`,
    { withCredentials: true }
  );
  return response.data;
};

export default api;
