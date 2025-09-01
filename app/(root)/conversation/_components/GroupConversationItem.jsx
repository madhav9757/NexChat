"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const GroupConversationItem = ({
  conversation,
  members,
  lastMessage,
  unseenCount,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === `/conversation/${conversation?._id}`;

  // Format last message time
  const formattedTime = lastMessage?._creationTime
    ? new Date(lastMessage._creationTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/conversation/${conversation?._id}`)}
      className={cn(
        "flex w-full items-center gap-3 p-2.5 rounded-lg cursor-pointer transition select-none",
        "hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive && "bg-muted shadow-sm"
      )}
    >
      {/* Group Icon */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted text-muted-foreground shrink-0">
        <Users size={20} />
      </div>

      {/* Conversation Info */}
      <div className="flex-1 overflow-hidden min-w-0">
        <div className="flex justify-between items-center gap-2">
          {/* Group name */}
          <h3 className="font-medium truncate">
            {conversation?.name || "Unnamed Group"}
          </h3>

          {/* Last message time */}
          {formattedTime && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formattedTime}
            </span>
          )}
        </div>

        {/* Last message preview */}
        <p className="text-xs text-muted-foreground truncate">
          {lastMessage ? (
            <>
              <span className="font-medium">{lastMessage?.sender}</span>
              {`: ${lastMessage?.content || "Attachment"}`}
            </>
          ) : (
            `${members?.length || 0} members`
          )}
        </p>
      </div>

      {/* Unseen messages badge */}
      {unseenCount > 0 && (
        <Badge
          className="ml-auto rounded-full px-2 py-0.5 text-xs font-semibold"
          variant="destructive"
        >
          {unseenCount}
        </Badge>
      )}
    </div>
  );
};

export default GroupConversationItem;
