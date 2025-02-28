"use client";
import ProtectedRoute from "../../_Components/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function studentDashboard() {
  const router = useRouter();

  return (
    <ProtectedRoute role="STUDENT">
      <h1>Welcome to the Student Dashboard</h1>
    </ProtectedRoute>
  );
}
