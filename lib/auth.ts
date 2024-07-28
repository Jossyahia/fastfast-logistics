import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";


const adapter = new PrismaAdapter(client.session, client.user);
const auth = lucia({
  adapter: PrismaAdapter(prismaClient),
  strategies: [
    {
      name: "email_password",
      authenticate: async (email, password) => {
        const user = await prismaClient.user.findUnique({ where: { email } });
        if (!user || user.password !== password) return null;
        return user;
      },
    },
  ],
  session: {
    key: process.env.LUCIA_SESSION_SECRET,
  },
});

export default auth;
