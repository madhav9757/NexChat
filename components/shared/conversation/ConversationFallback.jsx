import React from "react";
import { Card } from "@/components/ui/card";
import { MessageCircleIcon } from "lucide-react";

const ConversationFallback = () => {
  return (
    <Card className="hidden h-full w-full lg:flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
      <MessageCircleIcon className="w-8 h-8 opacity-60" />
      <p className="text-lg font-medium">Start a conversation to get going</p>
      <p className="text-sm text-gray-500">
        Select a conversation from the sidebar or start a new one.
      </p>
    </Card>
  );
};

export default ConversationFallback;
