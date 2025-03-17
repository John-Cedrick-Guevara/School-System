import Nav from "@/app/_Components/Nav";
import ProtectedRoute from "@/app/_Components/ProtectedRoute";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks = [
    {
      name: "View Users",
      url: "/admin/dashboard/users",
    },
    {
      name: "View Sections",
      url: "/admin/dashboard/sections",
    },
    {
      name: "View Subjects",
      url: "/admin/dashboard/subjects",
    },
    {
      name: "View time stamps",
      url: "/admin/dashboard/timeStamps",
    },
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProtectedRoute role="ADMIN">
          <SidebarProvider>
            <AppSidebar item={navLinks} />
            <main className="p-12 w-full">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </ProtectedRoute>
      </body>
    </html>
  );
}
