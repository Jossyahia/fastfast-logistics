import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="max-w-8xl w-full p-6">
      <div className="flex justify-center bg-secondary dark:bg-secondary/50 py-4 w-full rounded-xl">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 px-6">
          <span className="text-sm">
            © {new Date().getFullYear()} FastFast Logistics Services. All rights
            reserved.
          </span>
          <div className="flex gap-4">
            <Link href="/privacy">
              <span className="text-sm underline cursor-pointer">
                Privacy Policy
              </span>
            </Link>
            <Link href="/terms">
              <span className="text-sm underline cursor-pointer">
                Terms of Service
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
