"use client";
import { useUser } from "@/app/context/UserContext";
import ProtectedRoute from "../../_Components/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function studentDashboard() {
  return (
    <ProtectedRoute role="STUDENT">
      <StudentDashboardContent />
    </ProtectedRoute>
  );
}

function StudentDashboardContent() {
  const user = useUser();
  return (
    <>
      <h1 className="font-bold text-2xl">Welcome to the Student Dashboard</h1>
      <div className="mt-12">
        <h1 className="flex gap-1">
          Email: <span className="text-slate-600">{user?.email}</span>
        </h1>
        <h1 className="flex  gap-1">
          Name: <span className="text-slate-600">{user?.name}</span>
        </h1>
        <h1 className="flex  gap-1">
          ID: <span className="text-slate-600">{user?.id}</span>
        </h1>
        <h1 className="flex  gap-1">
          Section: <span className="text-slate-600">{user?.sectionId}</span>
        </h1>
      </div>
    </>
  );
}
