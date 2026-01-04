"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { formatDistanceToNowStrict } from "date-fns";

const GroupConversationItem = ({
  conversation,
  members,
  lastMessage,
  unseenCount,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === `/conversation/${conversation?._id}`;

  // Premium short-form time (e.g., 5m, 2h)
  const formattedTime = lastMessage?._creationTime
    ? formatDistanceToNowStrict(new Date(lastMessage._creationTime), { addSuffix: false })
        .replace('seconds', 's')
        .replace('minutes', 'm')
        .replace('hours', 'h')
        .replace('days', 'd')
    : null;

  return (
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/conversation/${conversation?._id}`)}
      className={cn(
        "group relative flex w-full items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-200 select-none",
        "hover:bg-zinc-100 dark:hover:bg-zinc-900",
        isActive ? "bg-zinc-100 dark:bg-zinc-900 shadow-sm" : "bg-transparent"
      )}
    >
      {/* Active Indicator Bar */}
      {isActive && (
        <motion.div 
          layoutId="active-indicator"
          className="absolute left-0 w-1 h-8 bg-blue-600 dark:bg-blue-500 rounded-r-full" 
        />
      )}

      {/* Dynamic Avatar Stack */}
      <div className="relative h-11 w-11 shrink-0">
        {members && members.length > 0 ? (
          <>
            {/* The "Main" member avatar */}
            <Avatar className="absolute bottom-0 left-0 h-8 w-8 border-2 border-white dark:border-zinc-950 z-10 shadow-sm">
              <AvatarImage src={members[0]?.imageUrl} />
              <AvatarFallback className="text-[10px]">{members[0]?.username?.[0]}</AvatarFallback>
            </Avatar>
            {/* The "Secondary" member avatar */}
            <Avatar className="absolute top-0 right-0 h-8 w-8 border-2 border-white dark:border-zinc-950 shadow-sm">
              <AvatarImage src={members[1]?.imageUrl || members[0]?.imageUrl} />
              <AvatarFallback className="text-[10px] bg-zinc-200 dark:bg-zinc-800">
                {members[1]?.username?.[0] || "+"}
              </AvatarFallback>
            </Avatar>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
            <Users size={20} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Conversation Info */}
      <div className="flex-1 overflow-hidden min-w-0 py-0.5">
        <div className="flex justify-between items-center gap-2 mb-0.5">
          <h3 className={cn(
            "text-sm font-bold truncate transition-colors",
            unseenCount > 0 ? "text-zinc-950 dark:text-white" : "text-zinc-700 dark:text-zinc-300"
          )}>
            {conversation?.name || "Unnamed Group"}
          </h3>

          {formattedTime && (
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
              {formattedTime}
            </span>
          )}
        </div>

        {/* Last message preview */}
        <div className="flex items-center justify-between gap-2">
          <p className={cn(
            "text-xs truncate leading-snug",
            unseenCount > 0 
              ? "text-zinc-900 dark:text-zinc-100 font-bold" 
              : "text-zinc-500 dark:text-zinc-400 font-medium"
          )}>
            {lastMessage ? (
              <>
                <span className="opacity-60">{lastMessage.sender}: </span>
                <span>{lastMessage.content}</span>
              </>
            ) : (
              <span className="italic opacity-60 italic">{members?.length || 0} members in group</span>
            )}
          </p>

          {/* Unseen Badge */}
          {unseenCount > 0 && (
            <div className="h-5 min-w-[20px] flex items-center justify-center rounded-full bg-blue-600 px-1.5 shadow-lg shadow-blue-500/20 animate-in zoom-in">
              <span className="text-[10px] font-bold text-white leading-none">
                {unseenCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GroupConversationItem;