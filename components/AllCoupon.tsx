"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Coupon {
  id: string;
  code: string;
  discountValue: number;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
}

const AllCoupon: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch("/api/coupons/available");
      if (!response.ok) {
        throw new Error("Failed to fetch coupons");
      }
      const data = await response.json();
      setCoupons(data);
    } catch (err) {
      setError("Failed to load coupons");
      console.error("Error fetching coupons:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        const response = await fetch(`/api/coupons/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete coupon");
        }
        setCoupons(coupons.filter((coupon) => coupon.id !== id));
        router.refresh();
      } catch (err) {
        setError("Failed to delete coupon");
        console.error("Error deleting coupon:", err);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/edit-coupon/${id}`);
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="mt-8 dark:bg-gray-900 shadow-md rounded-lg transition-colors duration-200 p-6">
      <h2 className="text-2xl font-bold mb-4">Available Coupons</h2>
      {coupons.length === 0 ? (
        <p>No available coupons found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Code</th>
                <th className="py-3 px-6 text-left">Discount</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Expiry Date</th>
                <th className="py-3 px-6 text-left">Usage</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {coupons.map((coupon) => (
                <tr
                  key={coupon.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {coupon.code}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {coupon.discountType === "PERCENTAGE"
                      ? `${coupon.discountValue}%`
                      : `#${coupon.discountValue.toFixed(2)}`}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {coupon.discountType === "PERCENTAGE"
                      ? "Percentage"
                      : "Fixed Amount"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {coupon.usedCount} / {coupon.usageLimit}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleEdit(coupon.id)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(coupon.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllCoupon;
