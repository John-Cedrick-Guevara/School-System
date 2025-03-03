"use client";
import ProtectedRoute from "@/app/_Components/ProtectedRoute";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TeacherDashboard() {
  return (
    <ProtectedRoute role="TEACHER">
      <TeacherDashboardContent /> {/* Move logic inside a separate component */}
    </ProtectedRoute>
  );
}

// ✅ New component that consumes `useUser`
function TeacherDashboardContent() {
  const router = useRouter()
  const user = useUser();

  useEffect(() => {
    if (!user || user.role !== "TEACHER") {
      console.log(user?.role);
      router.push("/sign_in");
    }
  },[user])
  
  console.log("here", user);
  
  return (
    <main>
      <h1>Welcome to the Teacher Dashboard</h1>
      <h1>{user?.email}</h1>
      <h1>{user?.name}</h1>
      <h1>{user?.id}</h1>
      <h1>{user?.sectionId}</h1>
      <h1>{user?.role}</h1>
    </main>
  );
}
