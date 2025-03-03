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

export default function page() {
  return (
    <ProtectedRoute role="ADMIN">
      <AdminpageContent />
    </ProtectedRoute>
  );
}

function AdminpageContent() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      console.log(user?.role);
      router.push("/sign_in");
    }
  }, [user]);

  const tables = ["Users", "Sections", "Subjects"];
  const actions = ["Add", "View", "Delete", "Edit"];

  console.log("here", user);
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Admin Page</h1>

      <div className="mt-10">
        {
          <Accordion type="single" collapsible className="w-full">
            {tables.map((item) => {
              return (
                <AccordionItem key={item} value={item}>
                  <AccordionTrigger className="font-bold text-lg">
                    {item}
                  </AccordionTrigger>
                  {actions.map((actions) => {
                    return (
                      <AccordionContent className="ml-3 hover:bg-secondary rounded-lg" key={actions}>
                        <Link href={`/${item}/${actions}`}>{actions} {item}</Link>
                      </AccordionContent>
                    );
                  })}
                </AccordionItem>
              );
            })}
          </Accordion>
        }
      </div>
    </main>
  );
}
