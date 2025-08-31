"use client";

import ItemList from '@/components/shared/item-list/ItemList';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Loader2, MessageSquare, Users } from 'lucide-react';
import React, { useMemo } from 'react';
import DMConversationItem from './_components/DMconversationItem.jsx';
import GroupConversationItem from './_components/GroupConversationItem.jsx';
import CreateGroupDialog from './_components/CreateGroupDialog.jsx';

const Layout = ({ children }) => {
  const conversations = useQuery(api.conversations.get);

  const sortedConversations = useMemo(() => {
    if (!conversations) return null;
    // Example: sort by latest message timestamp
    return [...conversations].sort((a, b) => {
      const aTime = a.lastMessage?.createdAt || 0;
      const bTime = b.lastMessage?.createdAt || 0;
      return bTime - aTime;
    });
  }, [conversations]);

  return (
    <div className="h-full flex gap-2">
      <ItemList title="Conversations" Action={<CreateGroupDialog />}>
        {sortedConversations ? (
          sortedConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <MessageSquare className="h-8 w-8 mb-2 text-gray-400" />
              <p className="text-sm font-medium">No Conversations Found</p>
              <p className="text-xs text-gray-500">
                Start a new chat or create a group to see it here
              </p>
            </div>
          ) : (
            sortedConversations.map((conversationObj) =>
              conversationObj.conversation.isGroup ? (
                <GroupConversationItem
                  key={conversationObj.conversation._id}
                  conversation={conversationObj.conversation}
                  members={conversationObj.members}
                  lastMessage={conversationObj.lastMessage}
                />
              ) : (
                <DMConversationItem
                  key={conversationObj.conversation._id}
                  conversation={conversationObj.conversation}
                  otherMember={conversationObj.otherMember}
                  lastMessage={conversationObj.lastMessage}
                />
              )
            )
          )
        ) : conversations === undefined ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="text-center text-sm text-red-500 py-4">
            Failed to load conversations
          </div>
        )}
      </ItemList>

      {children}
    </div>
  );
};

export default Layout;
