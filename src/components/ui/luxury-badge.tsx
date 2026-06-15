import { cn } from "@/lib/utils";

interface LuxuryBadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "emerald" | "dark" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function LuxuryBadge({
  children,
  variant = "gold",
  size = "sm",
  className,
}: LuxuryBadgeProps) {
  const variants = {
    gold: "bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/30",
    emerald: "bg-[#1a6b3c]/15 text-[#22a85a] border border-[#1a6b3c]/30",
    dark: "bg-white/5 text-[#aaaaaa] border border-white/10",
    outline: "bg-transparent text-[#f5f0e8] border border-white/20",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-[0.65rem] tracking-[0.1em]",
    md: "px-3 py-1 text-[0.7rem] tracking-[0.12em]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium uppercase rounded-sm",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
