"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export default function Body({ conversationId }) {
    const messages = useQuery(api.messages.getForCurrentUser, {});

    const scrollRef = useRef(null)

    // ✅ auto-scroll when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    if (messages === undefined) {
        return <p className="text-center text-muted-foreground mt-10">Loading...</p>
    }

    return (
        <ScrollArea ref={scrollRef} className="flex-1 px-4 py-3 space-y-4">
            {messages.length === 0 && (
                <p className="text-center text-muted-foreground mt-10">
                    No messages yet. Start the conversation!
                </p>
            )}

            {messages.map((msg, i) => (
                <div
                    key={i}
                    className={`flex items-end gap-2 ${msg.isMe ? "justify-end" : "justify-start"
                        }`}
                >
                    {!msg.isMe && (
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={msg.userImage} />
                            <AvatarFallback>{msg.userName?.[0]}</AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={`rounded-2xl px-4 py-2 max-w-[70%] shadow ${msg.isMe
                                ? "bg-primary text-primary-foreground rounded-br-none"
                                : "bg-muted text-foreground rounded-bl-none"
                            }`}
                    >
                        <p className="text-sm">{msg.text}</p>
                        <span className="text-[10px] text-muted-foreground block mt-1 text-right">
                            {msg.time}
                        </span>
                    </div>
                </div>
            ))}
        </ScrollArea>
    )
}
