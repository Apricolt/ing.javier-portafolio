"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";

// Aquí sí puedes desactivar SSR en el loading
const LoadingScreen = dynamic(
  () => import("./LoadingScreen"),
  { ssr: false }
);

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingScreen />
      {children}
    </>
  );
}