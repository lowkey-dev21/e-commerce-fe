// small helper to fetch /api/auth/me and store user in localStorage
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
const api = axios.create({ baseURL: API_BASE, withCredentials: true });

export const fetchCurrentUser = async () => {
  try {
    const res = await api.get(`/api/auth/me`);
    const data = res.data;
    if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      return data.user;
    }
    localStorage.removeItem("user");
    return null;
  } catch (err) {
    console.error("Failed fetching current user", err);
    return null;
  }
};
