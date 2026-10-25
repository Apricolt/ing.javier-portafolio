"use client";

import type { ReactNode } from "react";
import { useApp } from "@/components/layout/Providers";
import { ArrowRightIcon, ArrowUpRightIcon } from "./Icons";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

/** Botón tipo píldora. Los enlaces internos (#seccion) usan el scroll suave. */
export default function Button({ href, children, variant = "primary", className = "" }: Props) {
  const { scrollTo } = useApp();
  const internal = href.startsWith("#");

  const base =
    "group relative inline-flex items-center justify-center gap-3 rounded-full font-semibold transition-[background-color,box-shadow,border-color,transform] duration-300 active:scale-[0.97]";
  const styles =
    variant === "primary"
      ? "bg-cta py-2.5 pl-2.5 pr-6 text-sm text-white shadow-[0_10px_40px_-10px_rgb(47_107_255/0.8)] hover:bg-cta-hover hover:shadow-[0_14px_60px_-8px_rgb(47_107_255/0.95)] sm:text-base"
      : "border border-line/15 bg-line/[0.02] px-6 py-3 text-sm text-bone hover:border-line/35 hover:bg-line/[0.05]";

  return (
    <a
      href={href}
      onClick={
        internal
          ? (e) => {
              e.preventDefault();
              scrollTo(href);
            }
          : undefined
      }
      target={internal ? undefined : "_blank"}
      rel={internal ? undefined : "noopener noreferrer"}
      className={`${base} ${styles} ${className}`}
    >
      {variant === "primary" && (
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRightIcon className="h-4 w-4" />
        </span>
      )}
      {children}
      {variant === "ghost" && (
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </a>
  );
}
