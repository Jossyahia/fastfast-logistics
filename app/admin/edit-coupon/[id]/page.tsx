"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CouponForm from "@/components/CreateCouponForm";

export default function EditCouponPage() {
  const [coupon, setCoupon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Update error type here
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await fetch(`/api/coupons/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch coupon");
        }
        const data = await response.json();
        setCoupon(data);
      } catch (err) {
        setError("Failed to load coupon");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupon();
  }, [params.id]);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Coupon</h1>
      {coupon && (
        <CouponForm
          initialData={coupon}
          onSuccess={() => router.push("/admin/coupons")}
        />
      )}
    </div>
  );
}
