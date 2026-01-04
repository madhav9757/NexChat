"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronLeft, MoreVertical, Info, Phone, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Header({
  conversation,
  otherMember,
  otherMembers = [],
  options,
}) {
  const router = useRouter();
  const isGroup = conversation?.isGroup;

  const displayName = isGroup
    ? conversation?.name || "Group Chat"
    : otherMember?.username || "User";

  const avatarSrc = isGroup
    ? conversation?.imageUrl || otherMembers?.[0]?.imageUrl
    : otherMember?.imageUrl;

  const avatarFallback = displayName?.[0]?.toUpperCase() || "?";

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between w-full px-4 py-3 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      {/* --- LEFT SECTION --- */}
      <div className="flex items-center gap-1 sm:gap-3 overflow-hidden">
        {/* Back Button - Visible on Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0"
          onClick={() => router.push("/conversation")}
        >
          <ChevronLeft className="h-6 w-6 text-zinc-500" />
        </Button>

        <div className="relative shrink-0">
          <Avatar className="h-10 w-10 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <AvatarImage src={avatarSrc} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          
          {/* Status Dot with Pulse for Online */}
          {!isGroup && otherMember?.isOnline && (
            <span className="absolute bottom-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white dark:border-zinc-950"></span>
            </span>
          )}
        </div>

        <div className="flex flex-col min-w-0 ml-1">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate tracking-tight">
            {displayName}
          </h2>
          <p className={cn(
            "text-[10px] font-medium uppercase tracking-widest",
            isGroup ? "text-zinc-400" : otherMember?.isOnline ? "text-green-600 dark:text-green-500" : "text-zinc-400"
          )}>
            {isGroup ? `${otherMembers.length + 1} participants` : otherMember?.isOnline ? "Active Now" : "Offline"}
          </p>
        </div>
      </div>

      {/* --- RIGHT SECTION --- */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Voice/Video - The Posh Additions */}
        <div className="hidden sm:flex items-center gap-1 mr-2 pr-2 border-r border-zinc-200 dark:border-zinc-800">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors">
            <Video className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-zinc-500">
          <Info className="h-4 w-4" />
        </Button>

        {options?.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-zinc-500">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 shadow-xl border-zinc-200/50 dark:border-zinc-800/50">
              {options.map((option, id) => (
                <DropdownMenuItem
                  key={id}
                  onClick={option.onClick}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors",
                    option.destructive 
                      ? "text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30" 
                      : "text-zinc-600 dark:text-zinc-300"
                  )}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}