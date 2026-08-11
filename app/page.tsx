import { Suspense } from "react";
import { TrueVineApp } from "@/components/TrueVineApp";

export default function HomePage() {
  return (
    <Suspense fallback={<main className="shell" />}>
      <TrueVineApp />
    </Suspense>
  );
}