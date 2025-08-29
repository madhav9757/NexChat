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

export default function ConversationPage({ params }) {
  const { conversationId } = use(params);
  const conversation = useQuery(api.conversation.get, { id: conversationId });

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState(null); // ✅ plain JS safe

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
          otherMember={conversation.otherMember}
          options={conversation.isGroup ? [
            {
              label: "Leave Group",
              destructive: false,
              onClick: () => setLeaveGroupDialogOpen(true),
            },
            {
              label: "Delete Group",
              destructive: true,
              onClick: () => setDeleteGroupDialogOpen(true),
              destructive: true,
            },
          ] : [
            {
              label: "Remove Friend",
              destructive: true,
              onClick: () => setRemoveFriendDialogOpen(true),
            },
          ]} // todo: fill later
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
    </ConversationContainer>
  );
}
