// Pagination.tsx (Separate File)
// or within page.tsx, you can define it above the ViewAllUsersPage component

import Link from "next/link";
import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: {
    page?: string;
    role?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    search?: string;
  };
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  searchParams,
}) => {
  const getPageLink = (page: number) => {
    return `/users?page=${page}&sortBy=${searchParams.sortBy || ""}&sortOrder=${
      searchParams.sortOrder || ""
    }&role=${searchParams.role || ""}&startDate=${
      searchParams.startDate || ""
    }&endDate=${searchParams.endDate || ""}&search=${
      searchParams.search || ""
    }`;
  };

  return (
    <div className="flex justify-center mt-6">
      {currentPage > 1 && (
        <Link href={getPageLink(currentPage - 1)}>
          <a className="px-3 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
            Previous
          </a>
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link key={page} href={getPageLink(page)}>
          <a
            className={`px-3 py-2 mx-1 text-sm font-medium rounded-lg ${
              page === currentPage
                ? "text-white bg-blue-600 dark:bg-blue-500"
                : "text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {page}
          </a>
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={getPageLink(currentPage + 1)}>
          <a className="px-3 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
            Next
          </a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
