import React from "react";
import { Card } from "@/components/ui/card";
import { MessageCircleIcon } from "lucide-react";

const ConversationFallback = () => {
  return (
    <Card className="hidden h-full w-full lg:flex flex-1 flex-col items-center justify-center gap-4 text-center text-muted-foreground p-8">
      <div className="flex flex-col items-center gap-3">
        <MessageCircleIcon className="w-12 h-12 opacity-50" />
        <h2 className="text-2xl font-semibold">Select a Conversation</h2>
        <p className="text-sm text-gray-500 max-w-sm">
          Choose a chat from your sidebar to view messages and start a conversation.
        </p>
      </div>
    </Card>
  );
};

export default ConversationFallback;