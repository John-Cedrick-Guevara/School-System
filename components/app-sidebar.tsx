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

interface navLink {
  name: string;
  url: string;
}

interface Props {
  item: navLink[];
}

export function AppSidebar({ item }: Props) {
  const [curr, setCurr] = useState("");
  const router = useRouter();

  async function handleLogOut() {
    try {
      await axios.post("/api/students/logout");
      router.push("/");
    } catch (error) {
      console.log(error);
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
        <Button onClick={handleLogOut} className="w-full " variant={"outline"}>
          Edit Credentials
        </Button>
        <Button
          onClick={handleLogOut}
          className="w-full "
          variant={"secondary"}
        >
          Log Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
