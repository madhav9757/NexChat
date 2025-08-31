"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ArrowLeftCircle, Info, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header({
  conversation,
  otherMember,
  otherMembers = [],
  options,
}) {
  const router = useRouter();
  const isGroup = conversation?.isGroup;

  console.log("Header Rendered with conversation:", conversation);
  // ✅ Display name logic
  const displayName = isGroup
    ? conversation?.name || `${otherMembers.length} members`
    : otherMember?.username || "Unknown User";

  // ✅ Avatar (single avatar for now)
  const avatarSrc = isGroup
    ? conversation?.imageUrl || otherMembers?.[0]?.imageUrl
    : otherMember?.imageUrl;

  const avatarFallback = displayName?.[0]?.toUpperCase() || "?";

  // ✅ Status (show online/offline or member count)
  const statusText = isGroup
    ? `${otherMembers.length} members`
    : otherMember?.isOnline
    ? "Online"
    : "Offline";

  const statusColor = isGroup
    ? "text-gray-400"
    : otherMember?.isOnline
    ? "text-green-500"
    : "text-gray-400";

  return (
    <div className="flex items-center justify-between p-3 border-b bg-transparent">
      {/* Left section: back button + avatar + name */}
      <div className="flex items-center gap-3">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <ArrowLeftCircle className="h-5 w-5 text-muted-foreground cursor-pointer" />
        </div>

        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="font-semibold truncate max-w-[160px]">
            {displayName}
          </span>
          <span className={`text-xs ${statusColor}`}>{statusText}</span>
        </div>
      </div>

      {/* Right section: settings + info */}
      <div className="flex items-center gap-2">
        {options?.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((option, id) => (
                <DropdownMenuItem
                  key={id}
                  onClick={option.onClick}
                  className={cn("font-semibold", {
                    "text-destructive": option.destructive,
                  })}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button variant="ghost" size="icon">
          <Info className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
