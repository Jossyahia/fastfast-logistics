// app/admin/riders/page.tsx
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";



export default async function RidersPage() {
  const session = await auth();
   if (!session || session.user.role !== "ADMIN") {
     redirect("/restricted");
   }
  const riders = await prisma.rider.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Riders</h2>
      <table className="min-w-full bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider) => (
            <tr key={rider.id}>
              <td className="py-2 px-4 border-b">{rider.name}</td>
              <td className="py-2 px-4 border-b">{rider.email}</td>
              <td className="py-2 px-4 border-b">
                {rider.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
