"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LuxuryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline-gold" | "emerald" | "outline-emerald" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  as?: "button" | "a";
  href?: string;
}

const LuxuryButton = forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  (
    {
      children,
      className,
      variant = "gold",
      size = "md",
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      gold: "bg-gradient-to-r from-[#8f6f2a] via-[#c9a84c] to-[#f0d98b] text-black hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] active:scale-[0.98]",
      "outline-gold":
        "border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black",
      emerald:
        "bg-gradient-to-r from-[#0f4025] via-[#1a6b3c] to-[#22a85a] text-white hover:shadow-[0_0_30px_rgba(26,107,60,0.4)]",
      "outline-emerald":
        "border border-[#1a6b3c] text-[#1a6b3c] hover:bg-[#1a6b3c] hover:text-white",
      ghost:
        "text-[#f5f0e8] hover:bg-white/5 hover:text-[#c9a84c]",
    };

    const sizes = {
      sm: "px-4 py-2 text-[0.7rem] tracking-[0.12em]",
      md: "px-6 py-3 text-[0.75rem] tracking-[0.15em]",
      lg: "px-8 py-4 text-[0.8rem] tracking-[0.18em]",
      xl: "px-10 py-5 text-[0.875rem] tracking-[0.2em]",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 font-medium uppercase transition-all duration-300 cursor-pointer overflow-hidden",
          variants[variant],
          sizes[size],
          (disabled || loading) && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled || loading}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);

LuxuryButton.displayName = "LuxuryButton";
export { LuxuryButton };
