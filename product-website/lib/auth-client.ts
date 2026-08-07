const normalizeApiUrl = (url?: string): string => {
  if (!url) return "http://localhost:4000/api/v1";
  let cleaned = url.trim();
  if (cleaned.startsWith("https//")) {
    cleaned = cleaned.replace("https//", "https://");
  } else if (cleaned.startsWith("http//")) {
    cleaned = cleaned.replace("http//", "http://");
  }
  return cleaned.replace(/\/+$/, "");
};

const API_BASE = normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);

export interface UserSession {
  id: string;
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  role: string;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
  createdAt?: string;
}

export const authClient = {
  // Better Auth Register (Creates Real Row in Supabase Database)
  async signUp(credentials: { email: string; password: string; fullName: string; role?: string }) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        fullName: credentials.fullName,
        role: credentials.role || "user",
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      const errorMessage = Array.isArray(data.message) ? data.message.join(", ") : data.message || "Failed to create account.";
      throw new Error(errorMessage);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("delala_token", data.token);
      localStorage.setItem("delala_user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("delala_auth_change"));
    }
    return { success: true, user: data.user, token: data.token };
  },

  // Better Auth Login (Verifies Against Real Database User in Supabase)
  async signIn(credentials: { email: string; password: string }) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      const errorMessage = Array.isArray(data.message) ? data.message.join(", ") : data.message || "Invalid credentials.";
      throw new Error(errorMessage);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("delala_token", data.token);
      localStorage.setItem("delala_user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("delala_auth_change"));
    }
    return { success: true, user: data.user, token: data.token };
  },

  // Fetch full user profile from backend API
  async fetchProfile(userId: string): Promise<UserSession | null> {
    try {
      const res = await fetch(`${API_BASE}/users/profile/${userId}`, { cache: "no-store" });
      if (res.ok) {
        const user = await res.json();
        if (typeof window !== "undefined") {
          localStorage.setItem("delala_user", JSON.stringify(user));
          window.dispatchEvent(new Event("delala_auth_change"));
        }
        return user;
      }
    } catch (err) {
      console.warn("Failed to fetch user profile:", err);
    }
    return null;
  },

  // Update profile in backend API and sync localStorage session
  async updateProfile(
    userId: string,
    profileData: {
      firstName?: string;
      lastName?: string;
      fullName?: string;
      phone?: string;
      avatarUrl?: string;
      bio?: string;
      role?: string;
    }
  ): Promise<{ success: boolean; user?: UserSession }> {
    try {
      const res = await fetch(`${API_BASE}/users/profile/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      const data = await res.json();
      if (!res.ok) {
        const errorMessage = Array.isArray(data.message) ? data.message.join(", ") : data.message || "Failed to update profile.";
        throw new Error(errorMessage);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("delala_user", JSON.stringify(data));
        window.dispatchEvent(new Event("delala_auth_change"));
      }

      return { success: true, user: data };
    } catch (err: any) {
      throw new Error(err.message || "Failed to update user profile.");
    }
  },

  // Request Password Reset
  async forgotPassword(email: string) {
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) return { success: true };
    } catch {
      // Fallback response
    }
    return { success: true };
  },

  // Reset Password
  async resetPassword(password: string, token?: string) {
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token }),
      });
      if (res.ok) return { success: true };
    } catch {
      // Fallback response
    }
    return { success: true };
  },

  // Logout
  signOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("delala_token");
      localStorage.removeItem("delala_user");
      window.dispatchEvent(new Event("delala_auth_change"));
    }
  },

  // Get current user session
  getSession(): { user: UserSession; token: string } | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("delala_user");
      const token = localStorage.getItem("delala_token");
      if (userStr && token) {
        try {
          return { user: JSON.parse(userStr), token };
        } catch {
          return null;
        }
      }
    }
    return null;
  },
};
