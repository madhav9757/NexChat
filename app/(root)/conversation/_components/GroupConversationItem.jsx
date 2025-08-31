import React from "react";
import { Users } from "lucide-react"; // group icon
import { useRouter } from "next/navigation";

const GroupConversationItem = ({ conversation, members, lastMessage }) => {

    const router = useRouter();

    return (
        <div onClick={() => router.push(`/conversation/${conversation?._id}`)}
            className="flex w-full items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            {/* Group Icon */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Users size={20} />
            </div>

            {/* Conversation Info */}
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    {/* Group name */}
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {conversation.name || "Unnamed Group"}
                    </h3>

                    {/* Last message time */}
                    {lastMessage && (
                        <span className="text-xs text-gray-500">
                            {new Date(lastMessage._creationTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    )}
                </div>

                {/* Last message preview */}
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {lastMessage
                        ? `${lastMessage.senderName || "Someone"}: ${lastMessage.content?.[0] || "Attachment"
                        }`
                        : `${members.length} members`}
                </p>
            </div>
        </div>
    );
};

export default GroupConversationItem;
