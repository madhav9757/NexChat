"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t bg-background">
      <Button variant="ghost" size="icon">
        <Paperclip className="h-5 w-5 text-muted-foreground" />
      </Button>
      <Input
        placeholder="Type a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-1 rounded-full"
      />
      <Button
        onClick={handleSend}
        size="icon"
        className="rounded-full bg-primary text-primary-foreground"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
}
