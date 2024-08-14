// NavBarServer.js
import { auth } from "@/auth";
import NavBarClient from "./NavBarClient";

async function NavBarServer() {
  const session = await auth();
  return <NavBarClient user={session?.user} />;
}

export default NavBarServer;
