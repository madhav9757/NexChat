"use client";

import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import ItemList from "@/components/shared/item-list/ItemList";
import React from "react";
import AddFileDialog from "./_components/AddFileDialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import Request from "./_components/Request";

function FriendsPage() {
  const requests = useQuery(api.requests.get);
  const isLoading = requests === undefined;

  return (
    <div className="h-full flex gap-2 p-2">
      <ItemList title="Friends" Action={<AddFileDialog />}>
        {isLoading ? (
          <div className="flex justify-center items-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center text-sm text-muted-foreground">
            <p>No friend requests</p>
          </div>
        ) : (
          <div className="space-y-2">
            {requests.map((reqObj) => (
              <Request
                key={reqObj.request._id}
                sender={reqObj.sender}
                request={reqObj.request}
              />
            ))}
          </div>
        )}
      </ItemList>

      <ConversationFallback />
    </div>
  );
}

export default FriendsPage;
