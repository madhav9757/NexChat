"use client";

import ItemList from "@/components/shared/item-list/ItemList";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2, MessageSquare, AlertCircle, Sparkles } from "lucide-react";
import React, { useMemo } from "react";
import DMConversationItem from "./_components/DMconversationItem.jsx";
import GroupConversationItem from "./_components/GroupConversationItem.jsx";
import CreateGroupDialog from "./_components/CreateGroupDialog.jsx";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="h-full w-full flex bg-white dark:bg-zinc-950">
      <ItemList 
        title="Messages" 
        Action={<CreateGroupDialog />}
      >
        <AnimatePresence mode="wait">
          {conversations === undefined ? (
            /* --- POSH LOADING STATE --- */
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-[60vh] gap-4"
            >
              <div className="relative flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 z-10" />
                <div className="absolute h-12 w-12 rounded-full border-2 border-blue-500/20 animate-ping" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Syncing Chats</p>
            </motion.div>

          ) : !conversations ? (
            /* --- POSH ERROR STATE --- */
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-[60vh] p-6 text-center"
            >
              <div className="p-4 rounded-3xl bg-red-50 dark:bg-red-950/20 mb-4">
                <AlertCircle className="h-10 w-10 text-red-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Connection Interrupted</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-[180px]">We couldn't reach the secure vault. Check your network.</p>
            </motion.div>

          ) : sortedConversations.length === 0 ? (
            /* --- POSH EMPTY STATE --- */
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-[60vh] p-8 text-center"
            >
              <div className="relative mb-6">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-xl" />
                <MessageSquare className="h-12 w-12 text-zinc-300 dark:text-zinc-700 relative z-10" strokeWidth={1} />
                <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-blue-500 animate-pulse" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Quiet in here...</h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Your conversations will appear here once you start chatting.
              </p>
            </motion.div>

          ) : (
            /* --- POSH CONVERSATION LIST --- */
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-0.5"
            >
              {sortedConversations.map((conversationObj, index) => (
                <motion.div
                  key={conversationObj.conversation._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: index * 0.05 } 
                  }}
                >
                  {conversationObj.conversation.isGroup ? (
                    <GroupConversationItem
                      conversation={conversationObj.conversation}
                      members={conversationObj.members}
                      lastMessage={conversationObj.lastMessage}
                      unseenCount={conversationObj.unseenCount}
                    />
                  ) : (
                    <DMConversationItem
                      conversation={conversationObj.conversation}
                      otherMember={conversationObj.otherMember}
                      lastMessage={conversationObj.lastMessage}
                      unseenCount={conversationObj.unseenCount}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </ItemList>

      {/* Main Chat Content */}
      <main className="flex-1 bg-white dark:bg-zinc-950 border-l border-zinc-200/60 dark:border-zinc-800/60">
        {children}
      </main>
    </div>
  );
};

export default Layout;