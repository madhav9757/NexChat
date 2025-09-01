"use client";

import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";
import RemoveFriendDialog from "./_components/dialog/RemoveFriendDialog";
import DeleteGroupDialog from "./_components/dialog/DeleteGroupDialog";
import LeaveGroupDialog from "./_components/dialog/LeaveGroupDialog";
import { Loader2 } from "lucide-react";
import { use, useState } from "react";

export default function ConversationPage({ params }) {
  const { conversationId } = use(params); // ✅ fixed
  const conversation = useQuery(api.conversation.get, { id: conversationId });

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);

  if (conversation === undefined) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <h3>Loading...</h3>
        <Loader2 className="animate-spin text-muted-foreground h-6 w-6" />
      </div>
    );
  }

  if (conversation === null) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Conversation not found
      </div>
    );
  }

  return (
    <ConversationContainer>
      {/* Header */}
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
                  onClick: () => setDeleteGroupDialogOpen(true),
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

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <Body
          members={
            conversation.isGroup
              ? conversation.otherMembers ?? []
              : conversation.otherMember
                ? [conversation.otherMember]
                : []
          }
        />
      </div>

      {/* Chat Input */}
      <div className="shrink-0">
        <ChatInput
          conversationId={conversationId}
          currentUserId={conversation.currentUserId}
        />
      </div>

      {/* Dialogs */}
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
      <LeaveGroupDialog
        conversationId={conversationId}
        open={leaveGroupDialogOpen}
        setOpen={setLeaveGroupDialogOpen}
      />
    </ConversationContainer>
  );
}
