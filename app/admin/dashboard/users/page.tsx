"use client";

import { useSession, signIn, signOut } from "next-auth/react";
const UserPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Your email: {session.user.email}</p>
    </div>
  );
};

export default UserPage;
