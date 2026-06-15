"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  titleClassName?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  titleClassName,
  className,
}: SectionHeaderProps) {
  const alignClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex flex-col gap-4", alignClasses[align], className)}
    >
      {eyebrow && (
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[#c9a84c]">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-[#f5f0e8]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-[#aaaaaa] leading-relaxed mt-2">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "h-px w-16 mt-2",
          "bg-gradient-to-r from-[#c9a84c] to-transparent",
          align === "center" && "self-center",
          align === "right" && "self-end bg-gradient-to-l"
        )}
      />
    </motion.div>
  );
}
