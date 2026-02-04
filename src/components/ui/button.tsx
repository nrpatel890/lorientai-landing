"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background",
          "disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-accent hover:bg-accent-light text-white shadow-lg shadow-accent/25":
              variant === "primary",
            "bg-background-tertiary hover:bg-border text-foreground border border-border":
              variant === "secondary",
            "hover:bg-background-secondary text-foreground-muted hover:text-foreground":
              variant === "ghost",
            "border border-border hover:border-accent text-foreground-muted hover:text-foreground":
              variant === "outline",
          },
          {
            "text-sm px-3 py-1.5 rounded-md": size === "sm",
            "text-sm px-4 py-2 rounded-lg": size === "md",
            "text-base px-6 py-3 rounded-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
