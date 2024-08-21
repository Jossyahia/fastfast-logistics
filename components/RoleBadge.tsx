import { FC } from "react";

interface RoleBadgeProps {
  role: string;
}

const RoleBadge: FC<RoleBadgeProps> = ({ role }) => {
  const badgeStyles = {
    ADMIN: "bg-red-100 text-red-800",
    USER: "bg-green-100 text-green-800",
    RIDER: "bg-blue-100 text-blue-800",
  };

  const badgeColor =
    badgeStyles[role as keyof typeof badgeStyles] ||
    "bg-gray-100 text-gray-800";

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}
    >
      {role}
    </span>
  );
};

export default RoleBadge;
