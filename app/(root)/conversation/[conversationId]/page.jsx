"use client"

import ConversationContainer from '@/components/shared/conversation/ConversationContainer'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Header from './_components/Header'
import { use, useState } from "react";
import Body from './_components/body/Body'
import ChatInput from './_components/input/chatInput'
import { de } from 'zod/v4/locales'
import RemoveFriendDialog from './_components/dialog/RemovefriendDialog'
import DeleteGroupDialog from './_components/dialog/DeleteGroupDialog'

export default function ConversationPage({ params }) {
  const { conversationId } = use(params);
  const conversation = useQuery(api.conversation.get, { id: conversationId });

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState(null);

  if (conversation === undefined) {
    return <div>Loading...</div>;
  }

  if (conversation === null) {
    return <div>Conversation not found</div>;
  }

  return (
    <ConversationContainer>
      {/* Header (fixed height) */}
      <div className="shrink-0">
        <Header
          conversation={conversation}
          otherMember={conversation.otherMember}
          otherMembers={conversation.otherMembers}
          options={
            conversation.isGroup
              ? [
                {
                  label: "Leave Group",
                  destructive: false,
                  onClick: () => setLeaveGroupDialogOpen(true),
                },
                {
                  label: "Delete Group",
                  destructive: true,
                  onClick: () => {
                    if (conversation?.isGroup) {
                      setDeleteGroupDialogOpen(true);
                    } else {
                      console.warn("Tried to delete a non-group conversation");
                    }
                  },
                },
              ]
              : [
                {
                  label: "Remove Friend",
                  destructive: true,
                  onClick: () => setRemoveFriendDialogOpen(true),
                },
              ]
          }
        />
      </div>

      {/* Body (fills remaining space) */}
      <div className="flex-1 overflow-y-auto">
        <Body />
      </div>

      {/* Chat Input (fixed height) */}
      <div className="shrink-0">
        <ChatInput
          conversationId={conversationId}
          currentUserId={conversation.currentUserId}
        />
      </div>
      <RemoveFriendDialog
        conversationId={conversationId}
        open={removeFriendDialogOpen}
        setOpen={setRemoveFriendDialogOpen}
      />
      <DeleteGroupDialog
        conversationId={conversationId}
        open={deleteGroupDialogOpen}
        setOpen={setDeleteGroupDialogOpen}
      />
    </ConversationContainer>
  );
}
