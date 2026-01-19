"use client";

import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import ItemList from "@/components/shared/item-list/ItemList";
import React from "react";
import AddFriendDialog from "./_components/AddFriendDialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, UserPlus2, Inbox } from "lucide-react";
import Request from "./_components/Request";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

function FriendsPage() {
  const requests = useQuery(api.requests.get);
  const isLoading = requests === undefined;

  return (
    <div className="h-full flex gap-0 lg:gap-2 p-0 lg:p-2 bg-zinc-50/50 dark:bg-transparent">
      <ItemList
        title="Friends"
        Action={<AddFriendDialog />}
      >
        <div className="flex flex-col h-full overflow-hidden px-1">
          {isLoading ? (
            <div className="flex-1 flex flex-col justify-center items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600/60" strokeWidth={1.5} />
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Syncing</p>
            </div>
          ) : requests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="flex-1 flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="h-16 w-16 bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] flex items-center justify-center mb-4">
                <Inbox className="h-8 w-8 text-zinc-300 dark:text-zinc-700" strokeWidth={1.2} />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">All caught up</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-[180px]">No new friend requests at the moment.</p>
            </motion.div>
          ) : (
            <ScrollArea className="flex-1 pr-3 -mr-3">
              <div className="space-y-1 py-2">
                <div className="flex items-center gap-2 px-2 mb-4">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-[10px] font-bold text-blue-600">
                    {requests.length}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Pending Requests
                  </span>
                </div>

                <AnimatePresence mode="popLayout">
                  {requests.map((reqObj) => (
                    <motion.div
                      key={reqObj.request._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Request
                        sender={reqObj.sender}
                        request={reqObj.request}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          )}
        </div>
      </ItemList>

      <div className="hidden lg:block flex-1">
        <ConversationFallback />
      </div>
    </div>
  );
}

export default FriendsPage;