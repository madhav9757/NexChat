"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function Header({ otherMember }) {
  return (
    <div className="flex items-center justify-between p-3 border-b bg-transparent">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={otherMember?.imageUrl} />
          <AvatarFallback>
            {otherMember?.username
              ? otherMember.username.slice(0, 2).toUpperCase()
              : "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold truncate max-w-[120px]">
            {otherMember?.username}
          </span>
          <span
            className={`text-xs ${
              otherMember?.isOnline ? "text-green-500" : "text-gray-400"
            }`}
          >
            {otherMember?.isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <Info className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  );
}
