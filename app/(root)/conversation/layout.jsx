"use client";

import ItemList from "@/components/shared/item-list/ItemList";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2, MessageSquare, AlertCircle } from "lucide-react";
import React, { useMemo } from "react";
import DMConversationItem from "./_components/DMconversationItem.jsx";
import GroupConversationItem from "./_components/GroupConversationItem.jsx";
import CreateGroupDialog from "./_components/CreateGroupDialog.jsx";

const Layout = ({ children }) => {
  const conversations = useQuery(api.conversations.get);

  const sortedConversations = useMemo(() => {
    if (!conversations) return null;
    return [...conversations].sort((a, b) => {
      const aTime = a.lastMessage?.createdAt || 0;
      const bTime = b.lastMessage?.createdAt || 0;
      return bTime - aTime;
    });
  }, [conversations]);

  return (
    <div className="h-full w-full flex gap-2 p-2">
      <ItemList title="Conversations" Action={<CreateGroupDialog />}>
        {conversations === undefined ? (
          // Loading State
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mb-2" />
            <p className="text-sm">Loading conversations...</p>
          </div>
        ) : !conversations ? (
          // Error State
          <div className="flex flex-col items-center justify-center py-10 text-red-500">
            <AlertCircle className="h-6 w-6 mb-2" />
            <p className="text-sm font-medium">Failed to load conversations</p>
            <p className="text-xs opacity-80">Please try again later</p>
          </div>
        ) : sortedConversations.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
            <MessageSquare className="h-8 w-8 mb-2" />
            <p className="text-sm font-medium">No Conversations Found</p>
            <p className="text-xs opacity-80">
              Start a new chat or create a group to see it here
            </p>
          </div>
        ) : (
          // Conversations List
          <div className="space-y-1 animate-in fade-in-0 slide-in-from-bottom-1">
            {sortedConversations.map((conversationObj) =>
              conversationObj.conversation.isGroup ? (
                <GroupConversationItem
                  key={conversationObj.conversation._id}
                  conversation={conversationObj.conversation}
                  members={conversationObj.members}
                  lastMessage={conversationObj.lastMessage}
                  unseenCount={conversationObj.unseenCount}
                />
              ) : (
                <DMConversationItem
                  key={conversationObj.conversation._id}
                  conversation={conversationObj.conversation}
                  otherMember={conversationObj.otherMember}
                  lastMessage={conversationObj.lastMessage}
                  unseenCount={conversationObj.unseenCount}
                />
              )
            )}
          </div>
        )}
      </ItemList>

      {children}
    </div>
  );
};

export default Layout;
