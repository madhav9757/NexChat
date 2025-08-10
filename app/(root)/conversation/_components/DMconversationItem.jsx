"use client";

import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const DMConversationItem = ({ conversation, otherMember }) => {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(`/conversation/${conversation?._id}`)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition"
        >
            <Avatar className="h-10 w-10">
                <AvatarImage
                    src={otherMember?.imageUrl}
                    alt={otherMember?.username || "User"}
                />
                <AvatarFallback>
                    {otherMember?.username?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col overflow-hidden">
                <span className="font-medium truncate">
                    {otherMember?.username || "Unknown User"}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                    {conversation?.lastMessage || "No messages yet"}
                </span>
            </div>
        </div>
    );
};

export default DMConversationItem;
