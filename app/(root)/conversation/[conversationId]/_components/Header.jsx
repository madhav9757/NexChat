"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ArrowLeftCircle, Info, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header({ otherMember, options }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between p-3 border-b bg-transparent">
      <div className="flex items-center gap-3">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <ArrowLeftCircle className="h-5 w-5 text-muted-foreground cursor-pointer" />
        </div>
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
            className={`text-xs ${otherMember?.isOnline ? "text-green-500" : "text-gray-400"
              }`}
          >
            {otherMember?.isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {options ?(
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((option, id) => {
                return (
                  <DropdownMenuItem key={id} onClick={option.onClick} className={cn("font-semibold", {"text-destructive": option.destructive})}>
                    {option.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
        <Button variant="ghost" size="icon">
          <Info className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
