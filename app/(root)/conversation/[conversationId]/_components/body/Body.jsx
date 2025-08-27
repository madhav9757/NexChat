'use client'

import { api } from '@/convex/_generated/api';
import { useConversation } from '@/hooks/useConversation';
import { useQuery } from 'convex/react';
import React from 'react';
import Messages from './Messages';

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

  console.log("messages : ", messages)

  if (messages.length === 0) {
    return (
      <div className="flex-1 w-full flex items-center justify-center text-gray-500">
        No messages yet
      </div>
    );
  }

  return (
    <div className="flex-1 w-full overflow-y-scroll flex flex-col-reverse gap-2 no-scrollbar p-4">

      {messages.map((msg, index) => {
        const prev = messages[index - 1];
        const next = messages[index + 1];

        // same sender checks
        const isSameAsPrev = prev?.message.senderId === msg.message.senderId;
        const isSameAsNext = next?.message.senderId === msg.message.senderId;

        return (
          <Messages
            key={msg.message._id}
            fromCurrentUser={msg.isCurrentUser}
            senderImage={msg.senderImage}
            senderName={msg.senderName}
            lastByUser={!isSameAsNext}
            showTimestamp={!isSameAsPrev}  
            content={msg.message.content}
            createdAt={msg.message._creationTime}
            type={msg.message.type}
          />
        );
      })}
    </div>
  );
};

      export default Body;
