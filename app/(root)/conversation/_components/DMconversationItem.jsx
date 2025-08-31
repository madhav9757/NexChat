"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter, usePathname } from "next/navigation";

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
      className={`flex w-full items-center gap-3 p-3 rounded-lg cursor-pointer transition
        ${isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent"}`}
    >
      {/* Avatar */}
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarSrc} alt={displayName} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

      {/* Text content */}
      <div className="flex flex-col overflow-hidden">
        {/* Conversation / Group Name */}
        <span className="font-medium truncate">{displayName}</span>

        {/* Last message */}
        {lastMessage ? (
          <span className="text-xs text-muted-foreground truncate">
            {lastMessage?.sender}: {lastMessage?.content || "No messages yet"}
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
          className="ml-auto rounded-full px-2 py-0.5 text-xs font-bold"
          variant="destructive"
        >
          {unseenCount}
        </Badge>
      )}
    </div>
  );
};

export default ConversationItem;
