"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Header = ({ otherMember }) => {
  const params = useParams();

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b bg-background">
      {/* Back button for mobile */}
      <div className="flex items-center gap-3">
        <Link href="/conversation" className="lg:hidden">
          <ArrowLeft className="h-5 w-5 text-muted-foreground hover:text-foreground transition" />
        </Link>

        {/* Avatar + name */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={otherMember?.imageUrl}
              alt={otherMember?.username || "User"}
            />
            <AvatarFallback>
              {otherMember?.username?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">
              {otherMember?.username || "Unknown User"}
            </span>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>

      {/* Example right side actions */}
      <div className="flex items-center gap-2">
        <button className="text-sm text-muted-foreground hover:text-foreground transition">
          Info
        </button>
      </div>
    </div>
  );
};

export default Header;
