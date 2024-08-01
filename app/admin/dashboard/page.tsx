// src/app/dashboard/page.tsx
"use client";
import CreateTablesButton from '@/components/CreateTablesButton';

//import { ProtectedRoute } from "@/components/features/auth/ProtectedRoute";
//import { useAuth } from "@/contexts/AuthContext";

function DashboardPage() {
 // const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <p>Welcome</p>
      {/* Add more dashboard content here */}
      <CreateTablesButton />
    </div>
  );
}

export default DashboardPage;
