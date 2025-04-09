"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import EditCredentials from "@/app/_Components/EditCredentials";

interface navLink {
  name: string;
  url: string;
}

interface Props {
  item: navLink[];
}

export function AppSidebar({ item }: Props) {
  const [isEditingCredentials, setIsEditingCredentials] = useState(false);
  const [curr, setCurr] = useState("");
  const router = useRouter();

  async function handleLogOut() {
    try {
      await axios.post("/api/students/logout");
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.map((item) => (
                <SidebarMenuItem
                  onClick={() => setCurr(item.name)}
                  className={`${
                    item.name === curr && "bg-slate-200"
                  } rounded-md`}
                  key={item.name}
                >
                  <SidebarMenuButton asChild>
                    <Link prefetch href={item.url}>
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="space-y-2 pb-10">
        <Button
          onClick={() => setIsEditingCredentials(true)}
          className="w-full "
          variant={"outline"}
        >
          Edit Credentials
        </Button>
        <Button
          onClick={handleLogOut}
          className="w-full "
          variant={"secondary"}
        >
          Log Out
        </Button>

        {/* form */}
        <div
          className={`w-full h-screen fixed top-0 right-0 left-0 flex items-center justify-center mx-auto transition-all scale-0 z-30 ${
            isEditingCredentials &&
            "scale-100 bg-secondary bg-slate-300 bg-opacity-40"
          }`}
        >
          <div className="bg-secondary w-full max-w-md p-5 rounded-lg">
            <Button
              onClick={() => setIsEditingCredentials(false)}
              variant={"outline"}
            >
              <img src="/arrow.png" alt="" width={15} className=" rotate-180" />
              Cancel
            </Button>
            <h1 className="text-xl font-semibold mb-3 text-center">
              Edit Credentials
            </h1>
            {/* error message */}

            <EditCredentials />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
