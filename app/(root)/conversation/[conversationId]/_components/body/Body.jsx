"use client";

import { api } from "@/convex/_generated/api";
import { useConversation } from "@/hooks/useConversation";
import { useQuery } from "convex/react";
import React from "react";
import Messages from "./Messages";
import { ScrollArea } from "@/components/ui/scroll-area";

const Body = () => {
  const { conversationId } = useConversation();
  const messages = useQuery(api.messages.get, { id: conversationId });

  if (!messages) {
    return (
      <div className="flex-1 w-full flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 w-full flex items-center justify-center text-gray-500">
        No messages yet
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 w-full p-4 no-scrollbar">
      <div className="flex flex-col-reverse gap-2 no-scrollbar">
        {messages.map((msg, index) => {
          const lastByUser =
            index === 0 || messages[index - 1].isCurrentUser !== msg.isCurrentUser;
          return (
            <Messages
              key={msg.message._id}
              fromCurrentUser={msg.isCurrentUser}
              senderImage={msg.senderImage}
              senderName={msg.senderName}
              content={msg.message.content}
              createdAt={msg.message._creationTime}
              type={msg.message.type}
              lastByUser={lastByUser}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default Body;