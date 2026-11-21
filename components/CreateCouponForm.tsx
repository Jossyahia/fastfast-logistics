"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT";

interface CouponFormData {
  id?: string;
  code: string;
  discountValue: number;
  discountType: DiscountType;
  expiryDate: string;
  usageLimit: number;
  isActive?: boolean;
}

interface CouponFormProps {
  initialData?: CouponFormData;
  onSuccess?: () => void;
}

const CouponForm: React.FC<CouponFormProps> = ({ initialData, onSuccess }) => {
  const [formData, setFormData] = useState<CouponFormData>(
    initialData || {
      code: "",
      discountValue: 0,
      discountType: "PERCENTAGE",
      expiryDate: "",
      usageLimit: 1,
      isActive: true,
    }
  );
  type FormErrors = {
    [K in keyof CouponFormData]?: string;
  };
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.code.trim()) {
      newErrors.code = "Coupon code is required";
    } else if (!/^[A-Z0-9]{3,20}$/.test(formData.code.trim())) {
      newErrors.code =
        "Coupon code must be 3-20 characters long and contain only uppercase letters and numbers";
    }
    if (formData.discountValue <= 0) {
      newErrors.discountValue = "Discount value must be greater than 0";
    }
    if (
      formData.discountType === "PERCENTAGE" &&
      formData.discountValue > 100
    ) {
      newErrors.discountValue = "Percentage discount cannot exceed 100%";
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    }
    if (formData.usageLimit <= 0) {
      newErrors.usageLimit = "Usage limit must be greater than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "discountValue" || name === "usageLimit"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    try {
      const url = "/api/coupons";
      const method = formData.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      setSuccess(true);
      if (!formData.id) {
        setFormData({
          code: "",
          discountValue: 0,
          discountType: "PERCENTAGE",
          expiryDate: "",
          usageLimit: 1,
          isActive: true,
        });
      }
      if (onSuccess) {
        onSuccess();
      }
      router.refresh();
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 dark:bg-gray-900 shadow-md rounded-lg transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {formData.id ? "Edit Coupon" : "Create New Coupon"}
      </h2>
      {serverError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {serverError}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Coupon {formData.id ? "updated" : "created"} successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Coupon Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
              errors.code
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-indigo-300 focus:ring-indigo-200"
            }`}
          />
          {errors.code && (
            <p className="mt-1 text-sm text-red-500">{errors.code}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="discountValue"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Discount Value
          </label>
          <input
            type="number"
            id="discountValue"
            name="discountValue"
            value={formData.discountValue}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
              errors.discountValue
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-indigo-300 focus:ring-indigo-200"
            }`}
          />
          {errors.discountValue && (
            <p className="mt-1 text-sm text-red-500">{errors.discountValue}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="discountType"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Discount Type
          </label>
          <select
            id="discountType"
            name="discountType"
            value={formData.discountType}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="PERCENTAGE">Percentage</option>
            <option value="FIXED_AMOUNT">Fixed Amount</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
              errors.expiryDate
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-indigo-300 focus:ring-indigo-200"
            }`}
          />
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="usageLimit"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Usage Limit
          </label>
          <input
            type="number"
            id="usageLimit"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleInputChange}
            min="1"
            step="1"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
              errors.usageLimit
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-indigo-300 focus:ring-indigo-200"
            }`}
          />
          {errors.usageLimit && (
            <p className="mt-1 text-sm text-red-500">{errors.usageLimit}</p>
          )}
        </div>
        {formData.id && (
          <div>
            <label
              htmlFor="isActive"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Active
            </label>
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
              }
              className="mt-1 rounded"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {formData.id ? "Update Coupon" : "Create Coupon"}
        </button>
      </form>
    </div>
  );
};

export default CouponForm;
