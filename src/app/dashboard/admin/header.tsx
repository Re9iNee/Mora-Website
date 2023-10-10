"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const DashboardHeader = () => {
  const { status } = useSession();
  return (
    <header className='space-y-0.5'>
      <h2 className='text-2xl font-bold tracking-tight'>Admin Dashboard</h2>
      <p className='text-muted-foreground'>
        Manage account settings and website preferences.
      </p>

      <section>
        {status === "authenticated" && (
          <Button onClick={() => signOut()}>Sign out</Button>
        )}
      </section>
    </header>
  );
};

export default DashboardHeader;
