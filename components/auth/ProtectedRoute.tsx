// src/components/features/auth/ProtectedRoute.tsx
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getPageSession } from "@/lib/auth";

export function ProtectedRoute(WrappedComponent: React.ComponentType) {
  return function ProtectedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const session = await getPageSession();
        if (!session) {
          router.push("/login");
        }
      };
      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}
