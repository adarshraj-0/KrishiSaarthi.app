import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

export function AppLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-headline", className)}>
      <Leaf className="h-6 w-6" />
      <span className="text-xl font-bold tracking-tight">KrishiSaarthi</span>
    </div>
  );
}
