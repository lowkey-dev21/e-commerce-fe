import create from "zustand";
import axios from "axios";

type User = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  message?: string | null;
  error?: string | null;
  initiateRegistration: (payload: {
    email: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<void>;
  confirmSignup: (payload: {
    email: string;
    otp: string;
  }) => Promise<{ user: User | null; message?: string | null; error?: string }>;
  initiateLogin: (email: string) => Promise<any>;
  confirmLogin: (payload: {
    email: string;
    otp: string;
  }) => Promise<{ user: User | null; message?: string; error?: string }>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
};

// default to backend dev server; frontend dev server runs on 4002 so ensure API calls go to backend
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  loading: false,
  message: null,
  error: null,

  setUser: user => set({ user }),
  clearError: () => set({ error: null }),

  initiateRegistration: async ({ email, firstName, lastName }) => {
    set({ loading: true, error: null, message: null });
    try {
      console.debug("initiateRegistration: sending request", {
        url: `${API_BASE}/api/auth/sign-up/initiate`,
        payload: { email, first_name: firstName, last_name: lastName },
        timestamp: new Date().toISOString(),
      });
      const res = await api.post(`/api/auth/sign-up/initiate`, {
        email,
        first_name: firstName,
        last_name: lastName,
      });
      console.debug("initiateRegistration: response", {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        data: res.data,
      });
      if (res.status >= 400) throw new Error("Failed to initiate registration");
      const payload = res.data?.data ?? res.data;
      set({
        message:
          payload?.message ||
          "OTP sent to your email. Enter the code to confirm.",
      });
      // return payload so UI can show dev OTP or messages
      return payload;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to start registration";
      set({ error: msg });
      return undefined;
    } finally {
      set({ loading: false });
    }
  },

  confirmSignup: async ({ email, otp }) => {
    set({ loading: true, error: null, message: null });
    try {
      console.debug("confirmSignup: sending request", {
        url: `${API_BASE}/api/auth/sign-up/confirm`,
        payload: { email, otp },
        timestamp: new Date().toISOString(),
      });
      const res = await api.post(`/api/auth/sign-up/confirm`, { email, otp });
      console.debug("confirmSignup: response", {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        data: res.data,
      });
      const payload = res.data?.data ?? res.data;
      if (res.status >= 400)
        throw new Error(payload?.message || "Confirm signup failed");
      set({
        user: payload.user || null,
        message: payload?.message || "Signup confirmed",
      });
      return { user: payload.user || null, message: payload?.message || null };
    } catch (err: any) {
      console.debug("confirmSignup: error", {
        message: err?.message,
        stack: err?.stack,
        response: err?.response
          ? { status: err.response.status, data: err.response.data }
          : null,
      });
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to confirm signup";
      set({ error: msg });
      return { user: null, error: msg };
    } finally {
      set({ loading: false });
    }
  },

  initiateLogin: async (email: string) => {
    set({ loading: true, error: null, message: null });
    try {
      const res = await api.post(`/api/auth/login`, { email });
      if (res.status >= 400) throw new Error("Failed to initiate login");
      const payload = res.data?.data ?? res.data;
      set({
        message:
          payload?.message ||
          "OTP sent to your email. Enter the code to sign in.",
      });
      // return server data so callers can access dev fallback otp
      return payload;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Unable to start login";
      set({ error: msg });
      return undefined;
    } finally {
      set({ loading: false });
    }
  },

  confirmLogin: async ({ email, otp }) => {
    set({ loading: true, error: null, message: null });
    try {
      // Log outgoing request payload for debugging
      console.debug("confirmLogin: sending request", {
        url: `${API_BASE}/api/auth/login/confirm`,
        payload: { email, otp },
        timestamp: new Date().toISOString(),
      });
      const res = await api.post(`/api/auth/login/confirm`, { email, otp });
      // Log full response for debugging
      console.debug("confirmLogin: response", {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        data: res.data,
      });
      const payload = res.data?.data ?? res.data;
      if (res.status >= 400)
        throw new Error(payload?.message || "Confirm login failed");
      set({
        user: payload.user || null,
        message: payload?.message || "Login successful",
      });
      return {
        user: payload.user || null,
        message: payload?.message || "Login successful",
      };
    } catch (err: any) {
      // log full error/response for debugging
      console.debug("confirmLogin: error", {
        message: err?.message,
        stack: err?.stack,
        response: err?.response
          ? {
              status: err.response.status,
              statusText: err.response.statusText,
              headers: err.response.headers,
              data: err.response.data,
            }
          : null,
      });
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to confirm login";
      set({ error: msg });
      return { user: null, error: msg };
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    try {
      await api.post(`/api/auth/refresh`);
    } catch (err) {
      // silent
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await api.post(`/api/auth/logout`);
    } catch (err) {
      // swallow
    } finally {
      set({ user: null, loading: false });
    }
  },
}));

export default useAuthStore;
