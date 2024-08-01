import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"; // Ensure this import is correct
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserFromDb } from "./actions/user.actions";
import { db } from "./lib/db";

// Initialize NextAuth with DrizzlePostgreSQLAdapter and CredentialsProvider
export default NextAuth({
  adapter: new DrizzlePostgreSQLAdapter(db), // Use 'new' to instantiate the class
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const user = await getUserFromDb(
          credentials.email,
          credentials.password
        );

        if (!user) {
          throw new Error("No user found with the given credentials");
        }

        return user.data;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
