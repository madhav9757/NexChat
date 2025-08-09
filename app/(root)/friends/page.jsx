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
    <div className="h-full flex gap-2">
      <ItemList title="Friends" Action={<AddFileDialog />}>
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : requests.length === 0 ? (
          <p className="text-muted-foreground">No friend requests</p>
        ) : (
          requests.map((reqObj) => (
            <Request
              key={reqObj.request._id}
              sender={reqObj.sender}
              request={reqObj.request}
            />
          ))
        )}
      </ItemList>
      <ConversationFallback />
    </div>
  );
}

export default FriendsPage;
