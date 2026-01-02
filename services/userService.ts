const API_BASE = import.meta.env.VITE_API_BASE;

export const userService = {
  async toggleFavorite(mealId: string): Promise<string[]> {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/api/user/favorites/${mealId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error("Failed to update favorites");
    }

    const data = await res.json();
    return data.favorites;
  },
  async updateProfile(payload: { name?: string; password?: string }) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/api/user/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Update failed");

    return data;
  },
    async deleteAccount() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/api/user/me`, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${token}`
        }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Delete failed");
    }

};
