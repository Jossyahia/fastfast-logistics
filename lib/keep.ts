import { PrismaClient } from "@prisma/client";
import lucia  from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { db } from "@lib/db";
import { cookies } from "next/headers";

// Initialize Prisma client
const prismaClient = new PrismaClient();

// Create an instance of PrismaAdapter
const adapter = new PrismaAdapter(prismaClient);

// Initialize Lucia authentication
const auth = lucia({
  adapter,
  strategies: [
    {
      name: "email_password",
      authenticate: async (email, password) => {
        // Retrieve user by email
        const user = await prismaClient.user.findUnique({ where: { email } });
        // Check if user exists and password matches (implement password hashing in production)
        if (!user || user.password !== password) return null;
        return user;
      },
    },
  ],
  session: {
    key: process.env.LUCIA_SESSION_SECRET, // Make sure this environment variable is set
  },
});

export default auth;
