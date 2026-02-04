import { cn } from "@/lib/utils";

interface CodeWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function CodeWindow({
  title = "terminal",
  children,
  className,
}: CodeWindowProps) {
  return (
    <div className={cn("code-block overflow-hidden", className)}>
      {/* Window header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-foreground-subtle ml-2">{title}</span>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto">{children}</div>
    </div>
  );
}
