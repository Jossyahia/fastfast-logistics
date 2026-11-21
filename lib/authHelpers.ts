import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export default async function protectAdminRoute() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/restricted");
  }
}
