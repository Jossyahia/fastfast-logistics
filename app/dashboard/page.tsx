"use client";
import { Button } from "@/components/ui/button";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Button>Manage Users</Button>
        <p>Welcome, {session.user.name || session.user.email}!</p>
        <Button>Manage Orders</Button>
        <Button>Manage Blog Posts</Button>
        <Button>View Analytics</Button>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  );
}
