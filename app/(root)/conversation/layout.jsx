"use client";

import ItemList from '@/components/shared/item-list/ItemList';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Loader2, MessageSquare } from 'lucide-react';
import React from 'react';
import DMConversationItem from './_components/DMConversationItem';

const Layout = ({ children }) => {
  const conversations = useQuery(api.conversations.get);

  return (
    <div className="h-full flex gap-2">
      <ItemList title="Conversation">
        {conversations ? (
          conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <MessageSquare className="h-8 w-8 mb-2 text-gray-400" />
              <p className="text-sm font-medium">No Conversation Found</p>
              <p className="text-xs text-gray-500">
                Start a new chat to see it here
              </p>
            </div>
          ) : (
            conversations.map((conversationObj) =>
              conversationObj.conversation.isGroup ? null : (
                <DMConversationItem
                  key={conversationObj.conversation._id}
                  conversation={conversationObj.conversation}
                  otherMember={conversationObj.otherMember}
                />
              )
            )
          )
        ) : (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="animate-spin text-gray-400" />
          </div>
        )}
      </ItemList>
      {children}
    </div>
  );
};

export default Layout;
