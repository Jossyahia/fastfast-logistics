import { FC } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import FilterForm from "@/components/FilterForm";
import Pagination from "./../../components/Pagination";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-react"; // Import the icons
import RoleBadge from "@/components/RoleBadge"; // Import the RoleBadge component

interface ViewAllUsersPageProps {
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

async function getUsers(searchParams: ViewAllUsersPageProps["searchParams"]) {
  const page = parseInt(searchParams.page || "1");
  const limit = 10;
  const skip = (page - 1) * limit;

  let where: any = {};

  if (searchParams.role) {
    where.role = searchParams.role;
  }
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

  const orderBy = searchParams.sortBy
    ? { [searchParams.sortBy]: searchParams.sortOrder || "asc" }
    : { createdAt: "desc" as const }; // Fixed type here

  const users = await prisma.user.findMany({
    where,
    orderBy,
    skip,
    take: limit,
  });

  const total = await prisma.user.count({ where });

  return { users, total };
}

const ViewAllUsersPage: FC<ViewAllUsersPageProps> = async ({
  searchParams,
}) => {
  const session = await auth();

  // Check if the user is authenticated and has the ADMIN role
  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/restricted");
  }

  const { users, total } = await getUsers(searchParams);

  const page = parseInt(searchParams.page || "1");
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  if (
    users.length === 0 &&
    page === 1 &&
    !searchParams.search &&
    !searchParams.role &&
    !searchParams.startDate &&
    !searchParams.endDate
  ) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-colors duration-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          All Users
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          There are no users in the system yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        All Users
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
                  field="role"
                  label="Role"
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
            {users.map((user: any) => (
              <tr key={user.id} className="border-b dark:border-gray-700">
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  {user.id.slice(0, 8)}...
                </td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  {user.name || "N/A"}
                </td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  {user.email}
                </td>
                <td className="px-4 py-2">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/users/${user.id}`}
                    className="text-blue-500 hover:text-blue-700 mr-2 transition-colors duration-200"
                  >
                    View
                  </Link>
                  <Link
                    href={`/users/edit/${user.id}`}
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
    </div>
  );
};

const SortableHeader: FC<{
  field: string;
  label: string;
  searchParams: ViewAllUsersPageProps["searchParams"];
}> = ({ field, label, searchParams }) => {
  const isSorted = searchParams.sortBy === field;
  const nextOrder =
    isSorted && searchParams.sortOrder === "asc" ? "desc" : "asc";

  return (
    <Link
      href={`/users?sortBy=${field}&sortOrder=${nextOrder}`}
      className="flex items-center"
    >
      {label}
      {isSorted && (
        <>
          {searchParams.sortOrder === "asc" ? (
            <ChevronUpIcon className="ml-1 w-4 h-4" />
          ) : (
            <ChevronDownIcon className="ml-1 w-4 h-4" />
          )}
        </>
      )}
    </Link>
  );
};

export default ViewAllUsersPage;
