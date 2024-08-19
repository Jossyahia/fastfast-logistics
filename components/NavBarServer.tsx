// NavBarServer.tsx
// NavBarServer.tsx
import { auth } from "@/auth";
import NavBarClient from "./NavBarClient";
import { Role } from "@prisma/client";
import { Image } from "next/image";

async function NavBarServer() {
  const session = await auth();
  
  console.log("Full session object:", JSON.stringify(session, null, 2));

  const user = session?.user ? {
    name: session.user.name ?? "",
    Image: session.user.Image ?? "",
    role: session.user.role as Role
  } : null;

  console.log("User object passed to NavBarClient:", JSON.stringify(user, null, 2));

  return <NavBarClient user={user} />;
}

export default NavBarServer;