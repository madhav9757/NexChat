"use client";

import { api } from "@/convex/_generated/api";
import { useConversation } from "@/hooks/useConversation";
import { useQuery } from "convex/react";
import React, { useEffect } from "react";
import Messages from "./Messages";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMutationState from "@/hooks/useMutationState";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Body = ({ members }) => {
  const { conversationId } = useConversation();
  const messages = useQuery(api.messages.get, { id: conversationId });
  const [markRead, pending] = useMutationState(api.conversation.markRead);

  useEffect(() => {
    if (messages && messages.length > 0) {
      markRead({
        conversationId,
        messageId: messages[0].message._id
      })
    }
  }, [messages?.length, conversationId, markRead])

  const formatSeenBy = (names) => {
    switch (names.length) {
      case 0:
        return <p className="text-muted-foreground text-sm text-right" >{"No one has seen this message"}</p>;
      case 1:
        return <p className="text-muted-foreground text-sm text-right" >{`Seen by ${names[0]}`}</p>;
      default:
        return (
          <Tooltip>
            <TooltipTrigger>
              <p className="text-muted-foreground text-sm text-right" >{`${names[0]} and ${names.length - 1} others have seen this message`}</p>
            </TooltipTrigger>
            <TooltipContent>
              <ul>
                {names.map((name, index) => (
                  <li key={index} className="text-muted-foreground text-sm text-right">
                    {name}
                  </li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        )
    }
  };

  const getSeenMessage = (messageId) => {
    const seenUsers = members
      .filter(member => member.lastSeenMessageId === messageId)
      .map(user => user.username); // just collect usernames

    if (seenUsers.length === 0) {
      return null;
    }

    return formatSeenBy(seenUsers);
  };

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
  console.log("Messages:", messages);

  return (
    <ScrollArea className="h-full w-full p-4 ">
      <div className="flex flex-col-reverse gap-2 ">
        {messages.map((msg, index) => {
          const lastByUser =
            index === 0 || messages[index - 1].isCurrentUser !== msg.isCurrentUser;

          const seenMessage = msg.isCurrentUser ? getSeenMessage(msg.message._id) : null;
          return (
            <Messages
              key={msg.message._id}
              fromCurrentUser={msg.isCurrentUser}
              senderImage={msg.senderImage}
              senderName={msg.senderName}
              content={msg.message.content}
              seen={seenMessage}
              createdAt={msg.message._creationTime}
              type={msg.message.type}
              lastByUser={lastByUser}
              isGroup={msg.isGroup}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default Body;