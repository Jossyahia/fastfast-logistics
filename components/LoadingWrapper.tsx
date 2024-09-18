// components/LoadingWrapper.tsx
"use client";

import { useLoading } from "@/components/LoadingContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useLoading();

  return (
    <>
      {loading && <LoadingSpinner />}
      {children}
    </>
  );
}
