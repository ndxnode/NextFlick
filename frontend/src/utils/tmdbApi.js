import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export async function getMediaDetails(mediaType, id) {
  try {
    const response = await tmdbApi.get(`/${mediaType}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching media details:", error);
    throw error;
  }
}

export async function searchMedia(query, page = 1) {
  try {
    const response = await tmdbApi.get("/search/multi", {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching media:", error);
    throw error;
  }
}

export async function getTrending(mediaType = "all", timeWindow = "week") {
  try {
    const response = await tmdbApi.get(`/trending/${mediaType}/${timeWindow}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trending media:", error);
    throw error;
  }
}
