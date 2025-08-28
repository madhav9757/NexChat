"use client";

import React from "react";
import ConversationFallback from "@/components/shared/conversation/ConversationFallback";

const ConversationPage = () => {
  return (
    <div className="h-full hidden lg:flex w-full items-center justify-center">
      <ConversationFallback />
    </div>
  );
};

export default ConversationPage;
