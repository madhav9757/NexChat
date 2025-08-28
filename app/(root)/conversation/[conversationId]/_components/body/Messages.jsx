import React, { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Messages = ({
  fromCurrentUser,
  senderImage,
  senderName,
  lastByUser,
  content,
  createdAt,
  type,
}) => {
  const [showTimestamp, setShowTimestamp] = useState(false);

  const formatDate = (timestamp) => {
    try {
      return format(new Date(timestamp), "HH:mm");
    } catch {
      return "";
    }
  };

  return (
    <div
      className={cn("flex items-end gap-2 group", {
        "justify-end": fromCurrentUser,
      })}
      onMouseEnter={() => setShowTimestamp(true)}
      onMouseLeave={() => setShowTimestamp(false)}
    >
      {/* Avatar (hidden if message is consecutive) */}
      <Avatar
        className={cn("w-8 h-8 shrink-0", {
          "order-2": fromCurrentUser,
          "order-1": !fromCurrentUser,
          invisible: lastByUser,
        })}
      >
        <AvatarImage src={senderImage} alt={senderName || "User"} />
        <AvatarFallback>{senderName?.charAt(0) || "?"}</AvatarFallback>
      </Avatar>

      {/* Message bubble */}
      <div
        className={cn("flex flex-col max-w-[70%]", {
          "order-1 items-end": fromCurrentUser,
          "order-2 items-start": !fromCurrentUser,
        })}
      >
        <div
          className={cn(
            "px-4 py-2 rounded-2xl shadow-sm transition-colors",
            fromCurrentUser
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-secondary text-secondary-foreground rounded-bl-none"
          )}
        >
          {type === "text" && (
            <p className="break-words whitespace-pre-wrap">{content}</p>
          )}

          {type === "image" && (
            <img
              src={content}
              alt="Sent image"
              className="rounded-lg max-h-60 object-cover"
            />
          )}
        </div>

        {/* Timestamp (only on hover) */}
        {showTimestamp && (
          <p
            className={cn(
              "text-[10px] mt-1 opacity-70 transition-opacity",
              fromCurrentUser ? "text-right" : "text-left"
            )}
          >
            {formatDate(createdAt)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Messages;
