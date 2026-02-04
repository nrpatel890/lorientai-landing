import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-background-secondary border border-border rounded-xl p-6",
        hover &&
          "transition-all duration-300 hover:border-border-light hover:bg-background-tertiary",
        className
      )}
    >
      {children}
    </div>
  );
}
