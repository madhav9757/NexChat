"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { formatDistanceToNowStrict } from "date-fns";

const ConversationItem = ({
  conversation,
  otherMember,
  members,
  lastMessage,
  unseenCount,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isGroup = conversation?.isGroup;

  const isActive = pathname === `/conversation/${conversation?._id}`;

  const displayName = isGroup
    ? conversation?.name || "Group Chat"
    : otherMember?.username || "Unknown User";

  // Formatted Time for the "posh" corner timestamp
  const timestamp = lastMessage?.createdAt
    ? formatDistanceToNowStrict(new Date(lastMessage.createdAt), { addSuffix: false })
      .replace('seconds', 's')
      .replace('minutes', 'm')
      .replace('hours', 'h')
      .replace('days', 'd')
    : "";

  return (
    <div
      onClick={() => router.push(`/conversation/${conversation?._id}`)}
      className={cn(
        "group relative flex w-full items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 select-none",
        "hover:bg-zinc-100 dark:hover:bg-zinc-900",
        isActive ? "bg-zinc-100 dark:bg-zinc-900 shadow-sm" : "bg-transparent"
      )}
    >
      {/* Active Indicator Line */}
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className="absolute left-0 w-1 h-6 bg-blue-600 dark:bg-blue-500 rounded-r-full"
        />
      )}

      {/* --- AVATAR SECTION --- */}
      <div className="relative shrink-0">
        {isGroup ? (
          // Posh Avatar Stack for Groups
          <div className="relative h-10 w-10">
            <Avatar className="absolute bottom-0 left-0 h-7 w-7 border-2 border-white dark:border-zinc-950 z-10">
              <AvatarImage src={members?.[0]?.imgUrl} />
              <AvatarFallback className="text-[10px] bg-blue-100 text-blue-700">G</AvatarFallback>
            </Avatar>
            <Avatar className="absolute top-0 right-0 h-7 w-7 border-2 border-white dark:border-zinc-950">
              <AvatarImage src={members?.[1]?.imgUrl} />
              <AvatarFallback className="text-[10px] bg-zinc-200 uppercase">{displayName?.[0]}</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Avatar className="h-11 w-11 shadow-sm border border-zinc-200/50 dark:border-zinc-800/50">
            <AvatarImage src={otherMember?.imgUrl} alt={displayName} />
            <AvatarFallback className="bg-gradient-to-tr from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900">
              {displayName?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}

        {/* Presence Dot (Online/Offline) */}
        {!isGroup && (
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-zinc-950" />
        )}
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between gap-1">
          <span className={cn(
            "text-sm font-semibold truncate transition-colors",
            unseenCount > 0 ? "text-zinc-950 dark:text-white" : "text-zinc-700 dark:text-zinc-300"
          )}>
            {displayName}
          </span>
          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-tighter shrink-0">
            {timestamp}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className={cn(
            "text-xs truncate leading-snug",
            unseenCount > 0
              ? "text-zinc-900 dark:text-zinc-100 font-bold"
              : "text-zinc-500 dark:text-zinc-400 font-medium"
          )}>
            {lastMessage ? (
              <>
                <span className="opacity-70">{isGroup && `${lastMessage.sender}: `}</span>
                {lastMessage.content}
              </>
            ) : (
              "Tap to start chatting"
            )}
          </p>

          {/* Unseen Badge */}
          {unseenCount > 0 && (
            <div className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1.5 shadow-lg shadow-blue-500/20">
              <span className="text-[10px] font-bold text-white leading-none">
                {unseenCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;