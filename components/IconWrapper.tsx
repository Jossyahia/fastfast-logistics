"use client";

interface IconWrapperProps {
  children: React.ReactNode;
}

export default function IconWrapper({ children }: IconWrapperProps) {
  return <div className="w-6 h-6">{children}</div>;
}
