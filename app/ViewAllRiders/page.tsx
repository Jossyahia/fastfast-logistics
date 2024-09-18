import { FC } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import FilterForm from "@/components/FilterForm";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Rider {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface ViewAllRidersPageProps {
  searchParams: {
    page?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    search?: string;
  };
}

async function getRiders(searchParams: ViewAllRidersPageProps["searchParams"]) {
  const page = parseInt(searchParams.page || "1");
  const limit = 10;
  const skip = (page - 1) * limit;

  let where: any = {};

  if (searchParams.startDate && searchParams.endDate) {
    where.createdAt = {
      gte: new Date(searchParams.startDate),
      lte: new Date(searchParams.endDate),
    };
  }

  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search, mode: "insensitive" } },
      { email: { contains: searchParams.search, mode: "insensitive" } },
    ];
  }

  const orderBy: { [key: string]: "asc" | "desc" } = searchParams.sortBy
    ? {
        [searchParams.sortBy]:
          searchParams.sortOrder === "desc" ? "desc" : "asc",
      }
    : { createdAt: "desc" };

  const riders = await prisma.rider.findMany({
    where,
    orderBy,
    skip,
    take: limit,
  });

  const total = await prisma.rider.count({ where });

  return { riders, total };
}

const ViewAllRidersPage: FC<ViewAllRidersPageProps> = async ({
  searchParams,
}) => {
  const session = await auth();
  if (!session || !session.user ) {
    redirect("/api/auth/signin");
  }

  const { riders, total } = await getRiders(searchParams);

  const page = parseInt(searchParams.page || "1");
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  if (
    riders.length === 0 &&
    page === 1 &&
    !searchParams.search &&
    !searchParams.startDate &&
    !searchParams.endDate
  ) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-colors duration-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          All Riders
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          There are no riders in the system yet.
        </p>
        <div className="mt-4 text-center">
          <Link
            href="/riders/new"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Add New Rider
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        All Riders
      </h1>

      <FilterForm searchParams={searchParams} />

      <div className="overflow-x-auto mt-6">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">
                <SortableHeader
                  field="name"
                  label="Name"
                  searchParams={searchParams}
                />
              </th>
              <th className="px-4 py-2 text-left">
                <SortableHeader
                  field="email"
                  label="Email"
                  searchParams={searchParams}
                />
              </th>
              <th className="px-4 py-2 text-left">
                <SortableHeader
                  field="createdAt"
                  label="Created At"
                  searchParams={searchParams}
                />
              </th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider: Rider) => (
              <tr key={rider.id} className="border-b dark:border-gray-700">
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  {rider.id.slice(0, 8)}...
                </td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  {rider.name}
                </td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  {rider.email}
                </td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  {new Date(rider.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/riders/${rider.id}`}
                    className="text-blue-500 hover:text-blue-700 mr-2 transition-colors duration-200"
                  >
                    View
                  </Link>
                  <Link
                    href={`/riders/edit/${rider.id}`}
                    className="text-green-500 hover:text-green-700 transition-colors duration-200"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      )}

      <div className="mt-8 text-center">
        <Link
          href="/riders/new"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Add New Rider
        </Link>
      </div>
    </div>
  );
};

const SortableHeader: FC<{
  field: string;
  label: string;
  searchParams: ViewAllRidersPageProps["searchParams"];
}> = ({ field, label, searchParams }) => {
  const isSorted = searchParams.sortBy === field;
  const nextOrder =
    isSorted && searchParams.sortOrder === "asc" ? "desc" : "asc";

  return (
    <Link
      href={`/riders?sortBy=${field}&sortOrder=${nextOrder}&startDate=${
        searchParams.startDate || ""
      }&endDate=${searchParams.endDate || ""}&search=${
        searchParams.search || ""
      }`}
      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
    >
      {label}
      {isSorted && (
        <span className="ml-1">
          {searchParams.sortOrder === "asc" ? "▲" : "▼"}
        </span>
      )}
    </Link>
  );
};

const Pagination: FC<{
  currentPage: number;
  totalPages: number;
  searchParams: ViewAllRidersPageProps["searchParams"];
}> = ({ currentPage, totalPages, searchParams }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-4 flex justify-center">
      <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
        <PaginationLink
          page={currentPage - 1}
          disabled={currentPage === 1}
          searchParams={searchParams}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </PaginationLink>
        {pageNumbers.map((pageNum) => (
          <PaginationLink
            key={pageNum}
            page={pageNum}
            active={pageNum === currentPage}
            searchParams={searchParams}
          >
            {pageNum}
          </PaginationLink>
        ))}
        <PaginationLink
          page={currentPage + 1}
          disabled={currentPage === totalPages}
          searchParams={searchParams}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </PaginationLink>
      </nav>
    </div>
  );
};

const PaginationLink: FC<{
  page: number;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
  searchParams: ViewAllRidersPageProps["searchParams"];
}> = ({ page, disabled, active, children, searchParams }) => {
  const baseClasses =
    "relative inline-flex items-center px-4 py-2 text-sm font-medium";
  const activeClasses =
    "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";
  const inactiveClasses =
    "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0";
  const disabledClasses = "cursor-not-allowed opacity-50";

  const classes = `${baseClasses} ${active ? activeClasses : inactiveClasses} ${
    disabled ? disabledClasses : ""
  }`;

  if (disabled) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <Link
      href={`/riders?page=${page}&startDate=${
        searchParams.startDate || ""
      }&endDate=${searchParams.endDate || ""}&sortBy=${
        searchParams.sortBy || ""
      }&sortOrder=${searchParams.sortOrder || ""}&search=${
        searchParams.search || ""
      }`}
      className={classes}
    >
      {children}
    </Link>
  );
};

export default ViewAllRidersPage;
