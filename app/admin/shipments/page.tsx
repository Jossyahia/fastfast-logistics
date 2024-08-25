// app/admin/shipments/page.tsx
import prisma from "@/lib/prisma";
import { auth } from "@/auth";


export default async function ShipmentsPage() {
  const session = await auth();
  const shipments = await prisma.shipment.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { user: true },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shipments</h2>
      <table className="min-w-full bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Tracking Number</th>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Current Location</th>
            <th className="py-2 px-4 border-b">Estimated Delivery</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td className="py-2 px-4 border-b">{shipment.trackingNumber}</td>
              <td className="py-2 px-4 border-b">{shipment.user.name}</td>
              <td className="py-2 px-4 border-b">{shipment.status}</td>
              <td className="py-2 px-4 border-b">{shipment.currentLocation}</td>
              <td className="py-2 px-4 border-b">
                {shipment.estimatedDelivery?.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
