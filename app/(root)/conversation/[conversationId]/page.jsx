"use client";

import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import { Loader2, ShieldAlert } from "lucide-react";
import { use, useState } from "react";
import ChatInput from "./_components/input/chatInput";
import RemoveFriendDialog from "./_components/dialog/RemovefriendDialog";
import DeleteGroupDialog from "./_components/dialog/DeleteGroupDialog";
import LeaveGroupDialog from "./_components/dialog/LeaveGroupDialog";
import { motion, AnimatePresence } from "framer-motion";

export default function ConversationPage({ params }) {
  const { conversationId } = use(params);
  const conversation = useQuery(api.conversation.get, { id: conversationId });

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);

  return (
    <ConversationContainer>
      <AnimatePresence mode="wait">
        {conversation === undefined ? (
          /* --- POSH LOADING STATE --- */
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full flex flex-col items-center justify-center gap-3 bg-zinc-50/50 dark:bg-transparent"
          >
            <div className="relative flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600/80" strokeWidth={1.5} />
              <div className="absolute h-12 w-12 rounded-full border border-blue-500/10 animate-pulse" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Secure Link</p>
          </motion.div>

        ) : conversation === null ? (
          /* --- POSH NOT FOUND STATE --- */
          <motion.div
            key="not-found"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full w-full flex flex-col items-center justify-center text-center p-6"
          >
            <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 rounded-3xl flex items-center justify-center mb-4">
              <ShieldAlert className="text-red-500 h-8 w-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Conversation Expired</h3>
            <p className="text-sm text-zinc-500 max-w-[240px] mt-1">This chat may have been deleted or you no longer have access.</p>
          </motion.div>

        ) : (
          /* --- THE MAIN STAGE --- */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="h-full w-full flex flex-col overflow-hidden"
          >
            {/* Header: Fixed top */}
            <div className="shrink-0 z-20">
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

            {/* Body: Flex grow to fill center */}
            <div className="flex-1 min-h-0 bg-white dark:bg-zinc-950">
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

            {/* Input: Fixed bottom */}
            <div className="shrink-0 p-4 bg-gradient-to-t from-white via-white to-transparent dark:from-zinc-950 dark:via-zinc-950">
              <ChatInput
                conversationId={conversationId}
                currentUserId={conversation.currentUserId}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DIALOGS - Keep these outside the motion flow */}
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