"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const GroupConversationItem = ({ conversation, members, lastMessage, unseenCount }) => {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = pathname === `/conversation/${conversation?._id}`;

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => router.push(`/conversation/${conversation?._id}`)}
            className={`flex w-full items-center gap-3 p-3 rounded-lg cursor-pointer transition
        ${isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent"}`}
        >
            {/* Group Icon */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Users size={20} />
            </div>

            {/* Conversation Info */}
            <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                    {/* Group name */}
                    <h3 className="font-medium truncate">
                        {conversation.name || "Unnamed Group"}
                    </h3>

                    {/* Last message time */}
                    {lastMessage && (
                        <span className="text-xs text-muted-foreground">
                            {new Date(lastMessage._creationTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    )}
                </div>

                {/* Last message preview */}
                <p className="text-sm text-muted-foreground truncate">
                    {lastMessage
                        ? `${lastMessage.sender}: ${lastMessage.content || "Attachment"}`
                        : `${members.length} members`}
                </p>
            </div>

            {/* Unseen messages badge */}
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

export default GroupConversationItem;
