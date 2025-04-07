"use client";
import ProtectedRoute from "@/app/_Components/ProtectedRoute";
import { useUser } from "@/app/context/UserContext";
import { Announcements } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

export default function TeacherDashboard() {
  return (
    <ProtectedRoute role="TEACHER">
      <TeacherDashboardContent /> {/* Move logic inside a separate component */}
    </ProtectedRoute>
  );
}

function TeacherDashboardContent() {
  const router = useRouter();
  const user = useUser();

  const {
    data: allAnnouncement,
    error,
    mutate,
  } = useSWR<Announcements[]>(
    ["/api/announcements", user?.role],
    ([url, role]) => axios.get(`${url}?&role=${role}`).then((res) => res.data)
  );

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
        <h1>
          {user?.name} - {user?.id}
        </h1>
      </div>

      {/* announcements */}
      <div className="flex flex-col gap-2 m-10">
        {allAnnouncement?.map((item) => (
          <div key={item.id} className=" rounded-md w-full max-w-3xl bg-secondary-foreground mx-auto p-8">
            <h1 className="font-bold text-3xl text-white capitalize">
              {item.title}
            </h1>
            <p className="text-slate-200 my-4">{item.description}</p>
            <h6 className="text-slate-500">
              {new Date(item.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h6>
          </div>
        ))}
      </div>
    </main>
  );
}
