import { AuthState } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE;

export const authService = {
  async login(email: string, password: string): Promise<AuthState> {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Login failed");
    }

    const data = await res.json();

    localStorage.setItem("token", data.token);

    return {
      user: data.user,
      token: data.token,
      isAuthenticated: true
    };
  },

  async signup(name: string, email: string, password: string): Promise<AuthState> {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    localStorage.setItem("token", data.token);

    return {
      user: data.user,
      token: data.token,
      isAuthenticated: true
    };
  },

  async getMe(): Promise<AuthState | null> {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      localStorage.removeItem("token");
      return null;
    }

    const data = await res.json();

    return {
      user: data.user,
      token,
      isAuthenticated: true
    };
  },

  logout() {
    localStorage.removeItem("token");
  }
};
