mport { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Button>Manage Users</Button>
        <Button>Manage Orders</Button>
        <Button>Manage Blog Posts</Button>
        <Button>View Analytics</Button>
      </div>
    </div>
  )
}