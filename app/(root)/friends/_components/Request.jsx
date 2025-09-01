"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import useMutationState from "@/hooks/useMutationState";
import { ConvexError } from "convex/values";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

export default function Request({ sender, request }) {
    const [denyRequest, denyPending] = useMutationState(api.request.deny);
    const [acceptRequest, acceptPending] = useMutationState(api.request.accept);

    const handleAccept = () => {
        acceptRequest({ id: request._id })
            .then(() => {
                toast.success("Friend request accepted");
            })
            .catch((error) => {
                toast.error(
                    error instanceof ConvexError
                        ? error.data
                        : "Unexpected error occurred"
                );
            });
    };

    const handleDeny = () => {
        denyRequest({ id: request._id })
            .then(() => {
                toast.success("Friend request denied");
            })
            .catch((error) => {
                toast.error(
                    error instanceof ConvexError
                        ? error.data
                        : "Unexpected error occurred"
                );
            });
    };

    return (
        <div className="flex justify-between items-center gap-4 p-3 rounded-xl bg-card hover:bg-accent transition-colors shadow-sm">
            {/* Sender Info */}
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={sender.imgUrl} alt={sender.username} />
                    <AvatarFallback>
                        {sender.username?.[0]?.toUpperCase() || "?"}
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <span className="font-medium leading-none">{sender.username}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                        {sender.email}
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <Button
                    onClick={handleAccept}
                    disabled={acceptPending}
                    size="icon"
                    className="bg-green-500 hover:bg-green-600 text-white"
                >
                    <Check className="h-4 w-4" />
                </Button>
                <Button
                    onClick={handleDeny}
                    disabled={denyPending}
                    size="icon"
                    variant="destructive"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
