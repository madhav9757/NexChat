"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import useMutationState from "@/hooks/useMutationState";
import { ConvexError } from "convex/values";
import { Check, X, UserPlus2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Request({ sender, request }) {
    const [denyRequest, denyPending] = useMutationState(api.request.deny);
    const [acceptRequest, acceptPending] = useMutationState(api.request.accept);

    const handleAccept = () => {
        acceptRequest({ id: request._id })
            .then(() => toast.success("Connection established"))
            .catch((error) => {
                toast.error(error instanceof ConvexError ? error.data : "Unexpected error occurred");
            });
    };

    const handleDeny = () => {
        denyRequest({ id: request._id })
            .then(() => toast.success("Request ignored"))
            .catch((error) => {
                toast.error(error instanceof ConvexError ? error.data : "Unexpected error occurred");
            });
    };

    const isPending = acceptPending || denyPending;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="group relative flex justify-between items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
        >
            {/* Subtle left accent line that appears on hover */}
            <div className="absolute left-0 top-4 bottom-4 w-1 bg-blue-600 rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />

            {/* Sender Info */}
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="relative">
                    <Avatar className="h-11 w-11 border-2 border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:border-blue-500/30 transition-colors">
                        <AvatarImage src={sender.imgUrl} alt={sender.username} className="object-cover" />
                        <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-xs font-bold">
                            {sender.username?.[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 border-2 border-white dark:border-zinc-900">
                        <UserPlus2 className="h-2 w-2 text-white" />
                    </div>
                </div>

                <div className="flex flex-col min-w-0">
                    <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight truncate">
                        {sender.username}
                    </span>
                    <span className="text-[11px] font-medium text-zinc-400 truncate">
                        {sender.email}
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 shrink-0">
                <Button
                    onClick={handleAccept}
                    disabled={isPending}
                    size="icon"
                    className="h-9 w-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
                >
                    <Check className="h-4 w-4" strokeWidth={3} />
                </Button>

                <Button
                    onClick={handleDeny}
                    disabled={isPending}
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all active:scale-95"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </motion.div>
    );
}