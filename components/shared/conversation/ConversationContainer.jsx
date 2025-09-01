import React from "react";
import { Card } from "@/components/ui/card";

const ConversationContainer = ({ children }) => {
  return (
    <Card
      className="
        w-full 
        h-[calc(100svh-32px)] 
        flex flex-col 
        overflow-hidden   /* ensures content doesn’t spill */
        p-4               /* more breathing room */
        gap-3 
        bg-background 
        border 
        shadow-md 
        rounded-xl
      "
    >
      {children}
    </Card>
  );
};

export default ConversationContainer;
