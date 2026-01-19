"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function Messages({
  fromCurrentUser,
  senderImage,
  senderName,
  content,
  seen,
  createdAt,
  lastByUser, // If true, this is the last message in a burst
  isGroup,
  type,
}) {
  const initials = senderName ? senderName.charAt(0).toUpperCase() : "?";

  return (
    <div
      className={cn("flex items-end gap-2 mb-1", {
        "flex-row-reverse": fromCurrentUser,
        "mb-6": lastByUser, // Add space after a burst of messages
      })}
    >
      {/* Avatar Logic: Only show for the last message in a burst (and never for current user if preferred) */}
      <div className={cn("relative h-8 w-8 shrink-0", !lastByUser && "opacity-0")}>
        {!fromCurrentUser && (
          <Avatar className="h-8 w-8 shadow-sm border border-zinc-200/50 dark:border-zinc-800/50">
            <AvatarImage src={senderImage} />
            <AvatarFallback className="text-[10px] bg-zinc-100">{initials}</AvatarFallback>
          </Avatar>
        )}
      </div>

      <div className={cn("flex flex-col max-w-[75%]", fromCurrentUser ? "items-end" : "items-start")}>
        {/* Bubble */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className={cn(
            "relative px-4 py-2.5 shadow-sm transition-all duration-200",
            // Posh Bubble Shapes
            fromCurrentUser
              ? "bg-indigo-600 text-white"
              : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-800",

            // Border Radius Logic for grouping
            fromCurrentUser
              ? cn("rounded-2xl rounded-tr-none", !lastByUser && "rounded-tr-2xl")
              : cn("rounded-2xl rounded-tl-none", !lastByUser && "rounded-tl-2xl")
          )}
        >
          {/* Group Member Name */}
          {isGroup && !fromCurrentUser && lastByUser && (
            <span className="block text-[10px] font-bold text-indigo-500 mb-1 uppercase tracking-tight">
              {senderName}
            </span>
          )}

          {/* Text Content */}
          {type === "text" && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap select-text">
              {content}
            </p>
          )}

          {/* Image Content */}
          {type === "image" && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={content}
                alt="Sent image"
                className="max-h-72 w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          )}

          {/* Floating Time (Only shows on hover or for last in group) */}
          <div className={cn(
            "text-[9px] mt-1 opacity-50 font-medium",
            fromCurrentUser ? "text-right text-indigo-100" : "text-left text-zinc-500"
          )}>
            {format(new Date(createdAt), "h:mm a")}
          </div>
        </motion.div>

        {/* Read Receipts Slot */}
        {fromCurrentUser && lastByUser && (
          <div className="w-full flex justify-end mt-1">
            {seen}
          </div>
        )}
      </div>
    </div>
  );
}