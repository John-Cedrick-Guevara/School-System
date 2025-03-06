"use client";
import React, { useEffect } from "react";
import ProtectedRoute from "../../_Components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";


function AdminpageContent() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      console.log(user?.role);
      router.push("/sign_in");
    }
  }, [user]);

  const tables = ["users", "sections", "subjects"];

  return (
    <main className="p-10">

      <div className="mt-10 flex flex-wrap gap-3">
        {tables.map((item) => {
          return (
            <Link
              key={item}
              href={`dashboard/${item}`}
              className="bg-secondary w-full max-w-sm rounded-lg cursor-pointer hover:scale-105 transition-all"
            >
              <h1 className="text-xl font-semibold p-10 capitalize">{item}</h1>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export default AdminpageContent
