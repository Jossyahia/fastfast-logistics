// app/admin/users/page.tsx
import prisma from "@/lib/prisma";
import { auth } from "@/auth";


export default async function UsersPage() {
  const session = await auth();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="min-w-full bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                {user.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
