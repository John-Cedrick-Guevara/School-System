"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        setUser(res.data);
        console.log("Fetched user:", user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);
  
  return { user, loading };
}
