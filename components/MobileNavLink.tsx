import Link from "next/link";
const MobileNavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link href={href}>
      <span className="text-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
        {children}
      </span>
    </Link>
    
  );
  export default MobileNavLink;
  