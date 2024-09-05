// app/actions/auth.tsx
"use server";

import { signIn, signOut } from "@/auth";

export async function serverSignIn() {
  await signIn();
  // No need to redirect here, as we're handling it in the component
}

export async function serverSignOut() {
  await signOut({
    redirect: false,
  });
  // No need to redirect here, as we're handling it in the component
}
