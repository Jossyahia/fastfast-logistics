import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function protectAdminRoute() {
  try {
    const session = await auth();

    if (!session) {
      console.log("No session found");
      return redirect("/login");
    }

    if (!session.user) {
      console.log("Session has no user");
      return redirect("/login");
    }

    if (session.user.role !== "ADMIN") {
      console.log("User is not an admin");
      return redirect("/restricted");
    }

    // If we get here, the user is an admin
    console.log("Admin access granted");
    return;
  } catch (error) {
    console.error("Error in protectAdminRoute:", error);
    return redirect("/error");
  }
}
