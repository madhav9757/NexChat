"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const ConversationItem = ({ conversation, otherMember, otherMembers }) => {
  const router = useRouter();

  // Decide what to display
  const isGroup = conversation?.isGroup;

  // Group: show group name or list of usernames
  const displayName = isGroup
    ? conversation?.name || otherMembers?.map((m) => m.username).join(", ")
    : otherMember?.username || "Unknown User";

  // Avatar: for group, maybe show first member’s avatar
  const avatarSrc = isGroup
    ? conversation?.imageUrl || otherMembers?.[0]?.imageUrl
    : otherMember?.imageUrl;

  const avatarFallback = isGroup
    ? displayName?.[0]?.toUpperCase() || "G"
    : otherMember?.username?.[0]?.toUpperCase() || "?";

  return (
    <div
      onClick={() => router.push(`/conversation/${conversation?._id}`)}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition"
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarSrc} alt={displayName} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col overflow-hidden">
        <span className="font-medium truncate">{displayName}</span>
        <span className="text-xs text-muted-foreground truncate">
          {conversation?.lastMessage || "No messages yet"}
        </span>
      </div>
    </div>
  );
};

export default ConversationItem;
