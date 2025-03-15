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
      <h1>admin p</h1>
    </main>
  );
}

export default AdminpageContent;
