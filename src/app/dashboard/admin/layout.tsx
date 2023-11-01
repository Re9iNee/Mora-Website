import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { SidebarNav } from "./components/sidebar-nav";
import DashboardHeader from "./header";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage Admin Dashboard",
};

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
  },
  {
    title: "AIs",
    href: "/dashboard/admin/ai",
  },
  {
    title: "Tags",
    href: "/dashboard/admin/tag",
  },
  {
    title: "Videos",
    href: "/dashboard/admin/video",
  },
  {
    title: "Question",
    href: "/dashboard/admin/question",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  return (
    <div className='space-y-6 p-10 pb-16 md:block h-screen'>
      <DashboardHeader />
      <Separator className='my-6' />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='-mx-4 lg:w-1/5'>
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className='flex-1'>{children}</div>
      </div>
      <Toaster />
    </div>
  );
}
