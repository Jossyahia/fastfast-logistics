import { ChevronsRight } from "lucide-react";

const LogoFooter = () => {
  return (
    <div className="flex items-center">
      <ChevronsRight className="w-12 h-12 text-primary group-hover:-rotate-12 transition-all duration-300" />
      <span className="text-xl group-hover:translate-x-0.5 transition-all duration-300 text-wrap-lime-300">
        FLS
      </span>
    </div>
  );
};
export default LogoFooter;