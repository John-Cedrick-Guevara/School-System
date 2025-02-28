"use client";
import ProtectedRoute from "@/app/_Components/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function teacherDashboard() {
console.log("here");
  return (
    <ProtectedRoute role="TEACHER">
      <h1>Welcome to the Teacher Dashboard</h1>
    </ProtectedRoute>
  );
}
