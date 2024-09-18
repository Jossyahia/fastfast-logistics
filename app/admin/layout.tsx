import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminLayoutClient from "./../../components/AdminLayoutClient";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/api/auth/signin");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
};

export default AdminLayout;
