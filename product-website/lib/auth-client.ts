const normalizeApiUrl = (url?: string): string => {
  if (!url) return "http://localhost:4000/api/v1";
  let cleaned = url.trim();
  if (cleaned.includes("localhost")) {
    return cleaned.replace(/\/+$/, "");
  }
  cleaned = cleaned.replace(/^(https?:?\/*)+/i, "");
  cleaned = cleaned.replace(/\/+/g, "/");
  if (!cleaned.includes("api/v1")) {
    cleaned = `${cleaned}/api/v1`.replace(/\/+/g, "/");
  }
  return `https://${cleaned}`.replace(/\/+$/, "");
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

/**
 * Drops the stored session and tells the app it is signed out.
 *
 * Exported so the API client can call it the moment the server rejects a token.
 * Without that, a token the server no longer accepts sits in localStorage
 * indefinitely: `getSession()` keeps returning it, the navbar keeps showing the
 * user as signed in, and every authenticated request 401s with nothing in the
 * interface to explain why or any way to recover short of clearing site data by
 * hand. That is what happened to every session issued before tokens were
 * signed, and it is what will happen to every session that passes thirty days.
 */
export const clearStoredSession = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("delala_token");
  localStorage.removeItem("delala_user");
  window.dispatchEvent(new Event("delala_auth_change"));
};

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
          // Only announce a change when something actually changed. This is a
          // read: firing the event unconditionally made any listener that
          // re-reads the profile trigger another fetch, and another event, in a
          // loop that also reset whatever the user was typing.
          const next = JSON.stringify(user);
          if (localStorage.getItem("delala_user") !== next) {
            localStorage.setItem("delala_user", next);
            window.dispatchEvent(new Event("delala_auth_change"));
          }
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
    } catch (err) {
      throw new Error((err instanceof Error ? err.message : "") || "Failed to update user profile.");
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
