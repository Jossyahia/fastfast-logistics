import Link from "next/link";
const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link href={href}>
      <span className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
        {children}
      </span>
    </Link>
  );
  export default NavLink;