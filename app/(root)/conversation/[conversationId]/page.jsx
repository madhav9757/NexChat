"use client"

import ConversationContainer from '@/components/shared/conversation/ConversationContainer'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Header from './_components/Header'
import { id } from 'zod/v4/locales'

const conversation = ({params}) => {

  const conversationId = params.id ;
  const conversation = useQuery(api.conversation.get, {id: conversationId}) ;

  if (!conversation) {
    return <div>Loading...</div>;
  }

  return (
    <ConversationContainer>
      <Header otherMember={conversation.otherMember} />
    </ConversationContainer>
  )
}

export default conversation
