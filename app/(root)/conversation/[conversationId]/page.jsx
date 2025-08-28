"use client"

import ConversationContainer from '@/components/shared/conversation/ConversationContainer'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Header from './_components/Header'
import { use } from "react";
import Body from './_components/body/Body'
import ChatInput from './_components/input/chatInput'

export default function ConversationPage({ params }) {
  const { conversationId } = use(params);
  const conversation = useQuery(api.conversation.get, { id: conversationId });

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
        <Header otherMember={conversation.otherMember} />
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
    </ConversationContainer>
  );
}
