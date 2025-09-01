"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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

  // Display name with fallback
  const displayName = isGroup
    ? conversation?.name ||
      `${members?.slice(0, 3).map((m) => m.username).join(", ")}${
        members?.length > 3 ? ` +${members.length - 3}` : ""
      }`
    : otherMember?.username || "Unknown User";

  // Avatar: group => conversation image or first member’s avatar
  const avatarSrc = isGroup
    ? conversation?.imageUrl || members?.[0]?.imageUrl
    : otherMember?.imageUrl;

  // Avatar fallback
  const avatarFallback = displayName?.[0]?.toUpperCase() || (isGroup ? "G" : "?");

  // Active state
  const isActive = pathname === `/conversation/${conversation?._id}`;

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
      {/* Avatar */}
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarImage src={avatarSrc} alt={displayName} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

      {/* Text content */}
      <div className="flex flex-col overflow-hidden min-w-0">
        <span className="font-medium truncate">{displayName}</span>

        {lastMessage ? (
          <span className="text-xs text-muted-foreground truncate">
            <span className="font-medium">{lastMessage?.sender}</span>
            {`: ${lastMessage?.content || "No messages yet"}`}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground truncate">
            No messages yet
          </span>
        )}
      </div>

      {/* Unseen count badge */}
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

export default ConversationItem;
