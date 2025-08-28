import React, { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      className={cn(`flex items-end`, { "justify-end": fromCurrentUser })}
    >
      <div className={cn(`flex flex-col w-full mx-2`, { "order-1 items-end": fromCurrentUser, "order-2 items-start": !fromCurrentUser })}>
        <div className={cn("px-4 py-2 rounded-lg max-w-[70%]", { "bg-primary text-primary-foreground": fromCurrentUser, "bg-secondary text-secondary-foreground": !fromCurrentUser, "rounded-br-none": !lastByUser && fromCurrentUser, "rounded-bl-none": !lastByUser && !fromCurrentUser })}>

          {type === "text" ? <p className="text-wrap break-words whitespace-pre-wrap">{content}</p> : null}
          <p className={cn("text-xs flex w-full my-1", { "text-primary-foreground justify-end": fromCurrentUser, "text-secondary-foreground justify-start": !fromCurrentUser })}>{formatDate(createdAt)}</p>
        </div>
      </div>
      <Avatar className={cn("relative w-8 h-8", {"order-2": fromCurrentUser, "order-1": !fromCurrentUser, invisible: lastByUser})}>
        <AvatarImage src={senderImage} alt={senderName} />
        <AvatarFallback>{senderName ? senderName.charAt(0) : "?"}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Messages;