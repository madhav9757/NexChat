"use client";

import { api } from "@/convex/_generated/api";
import { useConversation } from "@/hooks/useConversation";
import { useQuery } from "convex/react";
import React, { useEffect } from "react";
import Messages from "./Messages";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMutationState from "@/hooks/useMutationState";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { format } from "date-fns";

const Body = ({ members }) => {
  const { conversationId } = useConversation();
  const messages = useQuery(api.messages.get, { id: conversationId });
  const [markRead] = useMutationState(api.conversation.markRead);

  useEffect(() => {
    if (messages && messages.length > 0) {
      markRead({
        conversationId,
        messageId: messages[0].message._id
      });
    }
  }, [messages?.length, conversationId, markRead]);

  const renderReadReceipts = (messageId) => {
    const seenUsers = members
      .filter(member => member.lastSeenMessageId === messageId)
      .map(user => ({
        username: user.username,
        imageUrl: user.imageUrl,
      }));

    if (seenUsers.length === 0) return null;

    return (
      <div className="flex justify-end gap-1 mt-1 px-2">
        <TooltipProvider>
          {seenUsers.map((user, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <Avatar className="h-4 w-4 border border-background shadow-sm">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback className="text-[6px]">
                      {user.username[0]}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-[10px] py-1 px-2">
                Seen by {user.username}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    );
  };

  if (!messages) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-2">
        <div className="h-8 w-8 rounded-full border-2 border-zinc-200 border-t-blue-600 animate-spin" />
        <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Encrypting</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center text-zinc-400 gap-2">
        <div className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900">
           {/* You can put a ghost icon here */}
        </div>
        <p className="text-sm font-medium">No messages yet</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col-reverse gap-4 p-6 overflow-x-hidden">
        {messages.map((msg, index) => {
          const isFirstMessage = index === messages.length - 1;
          const nextMessage = messages[index + 1];
          const prevMessage = messages[index - 1];

          // Logic to show date separators
          const showDateSeparator = !nextMessage || 
            format(new Date(msg.message._creationTime), 'yyyy-MM-dd') !== 
            format(new Date(nextMessage.message._creationTime), 'yyyy-MM-dd');

          // Grouping logic: Is this the last message in a "burst" from this user?
          const lastByUser = !prevMessage || prevMessage.isCurrentUser !== msg.isCurrentUser;

          return (
            <React.Fragment key={msg.message._id}>
              {/* Individual Message */}
              <div className="flex flex-col">
                <Messages
                  fromCurrentUser={msg.isCurrentUser}
                  senderImage={msg.senderImage}
                  senderName={msg.senderName}
                  content={msg.message.content}
                  createdAt={msg.message._creationTime}
                  type={msg.message.type}
                  lastByUser={lastByUser}
                  isGroup={msg.isGroup}
                />
                {msg.isCurrentUser && renderReadReceipts(msg.message._id)}
              </div>

              {/* Date Separator */}
              {showDateSeparator && (
                <div className="flex items-center justify-center my-6">
                  <div className="h-[1px] flex-1 bg-zinc-100 dark:bg-zinc-800" />
                  <span className="mx-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 bg-white dark:bg-zinc-950 px-2">
                    {format(new Date(msg.message._creationTime), 'MMMM do, yyyy')}
                  </span>
                  <div className="h-[1px] flex-1 bg-zinc-100 dark:bg-zinc-800" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default Body;