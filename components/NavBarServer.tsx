// NavBarServer.tsx
import { auth } from "@/auth";
import NavBarClient from "./NavBarClient";
import { Role } from "@prisma/client";
import Image from "next/image";

async function NavBarServer() {
  const session = await auth();

  const user = session?.user
    ? {
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        image: session.user.image ?? "",
        role: session.user.role as Role,
        id: session.user.id ?? "",
      }
    : null;

  return <NavBarClient user={user} />;
}

export default NavBarServer;
