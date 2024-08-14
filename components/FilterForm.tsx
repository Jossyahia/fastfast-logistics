// components/FilterForm.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

type FilterFormProps = {
  searchParams: {
    status?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  };
};

export default function FilterForm({ searchParams }: FilterFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState(searchParams.status || "");
  const [startDate, setStartDate] = useState(searchParams.startDate || "");
  const [endDate, setEndDate] = useState(searchParams.endDate || "");
  const [search, setSearch] = useState(searchParams.search || "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (search) params.append("search", search);
    router.push(`/bookings?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-wrap -mx-2">
        <div className="px-2 w-full sm:w-1/2 md:w-1/4 mb-2">
          <input
            type="text"
            placeholder="Search bookings"
            className="w-full px-3 py-2 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="px-2 w-full sm:w-1/2 md:w-1/4 mb-2">
          <select
            className="w-full px-3 py-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <div className="px-2 w-full sm:w-1/2 md:w-1/4 mb-2">
          <input
            type="date"
            placeholder="Start Date"
            className="w-full px-3 py-2 border rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="px-2 w-full sm:w-1/2 md:w-1/4 mb-2">
          <input
            type="date"
            placeholder="End Date"
            className="w-full px-3 py-2 border rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}
