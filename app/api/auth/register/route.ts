// src/lib/auth.ts
import { lucia } from "lucia";
//import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { cache } from "react";
import * as context from "next/headers";

const client = new PrismaClient();

export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  adapter: prisma(client),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    return {
      username: data.username,
      email: data.email,
      name: data.name,
      role: data.role,
    };
  },
});

export type Auth = typeof auth;

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});
