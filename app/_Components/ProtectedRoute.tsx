"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext } from "@/app/context/UserContext";

interface User {
  email: string;
  id: string;
  name: string;
  password: string;
  role: string;
  sectionId: string;
}

export default function ProtectedRoute({
  role,
  children,
}: {
  role: "STUDENT" | "TEACHER" | "ADMIN";
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });

        if (res.data?.userData) {
          setUser(res.data.userData);
          
        } else {
          router.push("/sign_in");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/sign_in");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);



  if (loading) return <p>Loading...</p>; //Prevents rendering before data is available
  if (!user || user.role !== role) return <p>Unauthorized</p>;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
