"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const ConversationItem = ({ conversation, otherMember, members, lastMessage }) => {
  const router = useRouter();
  const isGroup = conversation?.isGroup;

  // Display name
  const displayName = isGroup
    ? conversation?.name || members?.map((m) => m.username).join(", ")
    : otherMember?.username || "Unknown User";

  // Avatar: group => conversation image or first member’s avatar
  const avatarSrc = isGroup
    ? conversation?.imageUrl || members?.[0]?.imageUrl
    : otherMember?.imageUrl;

  // Avatar fallback (initial letter)
  const avatarFallback = displayName?.[0]?.toUpperCase() || (isGroup ? "G" : "?");

  return (
    <div
      onClick={() => router.push(`/conversation/${conversation?._id}`)}
      className="flex w-full items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition"
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarSrc} alt={displayName} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

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
    </div>
  );
};

export default ConversationItem;
