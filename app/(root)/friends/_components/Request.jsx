"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Request({ sender, request }) {
    return (
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors">
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={sender.imgUrl} alt={sender.username} />
                    <AvatarFallback>
                        {sender.username?.[0]?.toUpperCase() || "?"}
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <span className="font-medium leading-none">{sender.username}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                        {sender.email}
                    </span>
                </div>
            </div>

            <div className="flex gap-1">
                <Button size="sm" className="h-7 px-2 bg-green-500 hover:bg-green-600">
                    Accept
                </Button>
                <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 px-2"
                >
                    Decline
                </Button>
            </div>
        </div>
    );
}
