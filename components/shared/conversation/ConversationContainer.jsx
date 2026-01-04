import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ConversationContainer = ({ children }) => {
  return (
    <Card
      className={cn(
        "relative w-full flex flex-col overflow-hidden transition-all duration-500",
        // Height handling: svh ensures it fills the viewport perfectly on mobile
        "h-[calc(100svh-16px)] lg:h-[calc(100svh-32px)]",
        // Glassmorphism & Depth
        "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl",
        "border-zinc-200/50 dark:border-zinc-800/50",
        "shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]",
        // Shape
        "rounded-[1.5rem] lg:rounded-[2rem]"
      )}
    >
      {/* Subtle Inner Glow for Premium feel */}
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] border border-white/20 dark:border-zinc-700/10" />
      
      {/* Content Layer */}
      <div className="relative flex flex-col h-full w-full">
        {children}
      </div>

      {/* Background Decor (Optional: adding a soft color bloom in the corner) */}
      <div className="absolute -top-[10%] -right-[10%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] pointer-events-none" />
    </Card>
  );
};

export default ConversationContainer;