"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function Header({ otherMember }) {
  return (
    <div className="flex items-center justify-between p-3 border-b bg-background sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={otherMember?.imageUrl} />
          <AvatarFallback>
            {otherMember?.username?.[0]?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{otherMember?.username}</span>
          <span className="text-xs text-green-500">Online</span>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <Info className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  );
}
