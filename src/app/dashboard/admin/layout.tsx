import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { SidebarNav } from "./components/sidebar-nav";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage Admin Dashboard",
};

const sidebarNavItems = [
  {
    title: "AI",
    href: "/dashboard/admin/ai",
  },
  {
    title: "User",
    href: "/dashboard/admin/user",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className='hidden space-y-6 p-10 pb-16 md:block h-screen'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>Admin Dashboard</h2>
        <p className='text-muted-foreground'>
          Manage account settings and website preferences.
        </p>
      </div>
      <Separator className='my-6' />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='-mx-4 lg:w-1/5'>
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className='flex-1 lg:max-w-2xl'>{children}</div>
      </div>
      <Toaster />
    </div>
  );
}
