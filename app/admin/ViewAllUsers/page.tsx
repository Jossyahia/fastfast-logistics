import { FC } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import FilterForm from "@/components/FilterForm";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Prisma, Role } from "@prisma/client";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  createdAt: Date;
}

interface ViewAllUsersPageProps {
  searchParams: {
    page?: string;
    role?: Role;
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

  let where: Prisma.UserWhereInput = {};

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

  const orderBy: Prisma.UserOrderByWithRelationInput = searchParams.sortBy
    ? { [searchParams.sortBy]: searchParams.sortOrder || "asc" }
    : { createdAt: "desc" };

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
  if (!session || !session.user) {
    redirect("/api/auth/signin");
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
      <div className="max-w-4xl mx-auto mt-8 p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-colors duration-200">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          All Users
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          There are no users in the system yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-full sm:max-w-6xl mx-auto mt-8 p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-colors duration-200">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        All Users
      </h1>

      <FilterForm searchParams={searchParams} />

      <div className="overflow-x-auto mt-6">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <TableHeader field="id" label="ID" searchParams={searchParams} />
              <TableHeader
                field="name"
                label="Name"
                searchParams={searchParams}
              />
              <TableHeader
                field="email"
                label="Email"
                searchParams={searchParams}
              />
              <TableHeader
                field="role"
                label="Role"
                searchParams={searchParams}
              />
              <TableHeader
                field="createdAt"
                label="Created At"
                searchParams={searchParams}
              />
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id} className="border-b dark:border-gray-700">
                <TableCell>{user.id.slice(0, 8)}...</TableCell>
                <TableCell>{user.name || "N/A"}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <RoleBadge role={user.role} />
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
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
                </TableCell>
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

const TableHeader: FC<{
  field: string;
  label: string;
  searchParams: ViewAllUsersPageProps["searchParams"];
}> = ({ field, label, searchParams }) => {
  const isSorted = searchParams.sortBy === field;
  const nextOrder =
    isSorted && searchParams.sortOrder === "asc" ? "desc" : "asc";

  return (
    <th className="px-4 py-2 text-left">
      <Link
        href={`/users?sortBy=${field}&sortOrder=${nextOrder}&role=${
          searchParams.role || ""
        }&startDate=${searchParams.startDate || ""}&endDate=${
          searchParams.endDate || ""
        }&search=${searchParams.search || ""}`}
        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
      >
        {label}
        {isSorted && (
          <span className="ml-1">
            {searchParams.sortOrder === "asc" ? "▲" : "▼"}
          </span>
        )}
      </Link>
    </th>
  );
};

const TableCell: FC<{ children: React.ReactNode }> = ({ children }) => (
  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{children}</td>
);

const RoleBadge: FC<{ role: Role }> = ({ role }) => {
  const badgeColor =
    {
      ADMIN: "bg-red-100 text-red-800",
      USER: "bg-green-100 text-green-800",
      RIDER: "bg-blue-100 text-blue-800",
    }[role] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}
    >
      {role}
    </span>
  );
};

const Pagination: FC<{
  currentPage: number;
  totalPages: number;
  searchParams: ViewAllUsersPageProps["searchParams"];
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
  searchParams: ViewAllUsersPageProps["searchParams"];
}> = ({ page, disabled, active, children, searchParams }) => {
  const baseClasses =
    "relative inline-flex items-center px-2 sm:px-4 py-2 text-sm font-medium";
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
      href={`/users?page=${page}&role=${searchParams.role || ""}&startDate=${
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

export default ViewAllUsersPage;
