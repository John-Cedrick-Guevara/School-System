"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";


function AdminpageContent() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      router.push("/sign_in");
    }
  }, [user]);


  return (
    <main className="p-10">
      <h1>admin page</h1>
    </main>
  );
}

export default AdminpageContent;
