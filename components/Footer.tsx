import Link from "next/link";
export const Footer = () => {
  return (
    <footer className="max-w-8xl w-full p-6">
      <Link href="/">
        <div className="flex justify-center bg-secondary dark:bg-secondary/50 py-4 w-full rounded-xl">
          <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 px-6">
            <span className="text-sm">
              © {new Date().getFullYear()} Fastfast Logistics Services. All
              rights reserved.{" "}
            </span>
          </div>
        </div>
      </Link>
    </footer>
  );
};
export default Footer;
