"use client";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";
import { User } from "../interfaces";
import React from "react";

// fetcher function
const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data.userData);

export default function ProtectedRoute({
  role,
  children,
}: {
  role: "STUDENT" | "TEACHER" | "ADMIN";
  children: React.ReactNode;
}) {
  const router = useRouter();

  // fetches the user
  const {
    data: user,
    error,
    isLoading,
  } = useSWR<User | null>("/api/auth/me", fetcher, {
    refreshInterval: 5000,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !user) {
    router.push("/sign_in");
    return null;
  }


  if (user.role !== role) return <p>Unauthorized</p>;

  // saves the data to the user context
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
