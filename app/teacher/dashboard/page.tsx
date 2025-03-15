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
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user || user.role !== "TEACHER") {
      console.log(user?.role);
      router.push("/sign_in");
    }
  }, [user]);

  return (
    <main>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Welcome to the Teacher Dashboard</h1>
        <h1>{user?.name} - {user?.id}</h1>
      </div>
    </main>
  );
}
