import React from "react";
import { redirect } from "next/navigation";
import AdminLayoutClient from "@/components/AdminLayoutClient";
import protectAdminRoute  from "@/lib/authHelpers";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  try {
    await protectAdminRoute();

    return <AdminLayoutClient>{children}</AdminLayoutClient>;
  } catch (error) {
    console.error("Authentication error:", error);
     redirect("/restricted");
  }
};

export default AdminLayout;
