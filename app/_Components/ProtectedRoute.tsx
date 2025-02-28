"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProtectedRoute({
  role,
  children,
}: {
  role: "STUDENT" | "TEACHER";
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });

        setUser(res.data); // ✅ Directly set user
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/sign_in");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user || user.role !== role ) return <p>Unauthorized {user?.role}</p>;

  return <>{children}</>;
}
