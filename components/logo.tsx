import { ChevronsRight } from "lucide-react";


interface LogoProps {
  className?: string;
}
export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className="flex items-center gap-2 group">
      <ChevronsRight className="w-12 h-12 text-primary group-hover:-rotate-12 transition-all duration-300" />
      <span className="text-xl group-hover:translate-x-0.5 transition-all duration-300 text-blue-600">
        FastFast
      </span>
    </div>
  );
};


export default Logo;
