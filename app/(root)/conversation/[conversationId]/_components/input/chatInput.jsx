"use client";

import { Card } from "@/components/ui/card";
import { useRef } from "react";
import { useConversation } from "@/hooks/useConversation";
import useMutationState from "@/hooks/useMutationState";
import { api } from "@/convex/_generated/api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import TextareaAutosize from "react-textarea-autosize";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";

// Schema for form validation
const chatMessageSchema = z.object({
  content: z.string().min(1, { message: "This field can't be empty" }),
});

export default function ChatInput() {
  const textareaRef = useRef(null);
  const { conversationId } = useConversation();
  const [createMessage, pending] = useMutationState(api.message.create);

  const form = useForm({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (values) => {
    // Check for empty message before submitting to prevent unnecessary API calls
    if (values.content.trim() === "") {
      return;
    }

    await createMessage({
      conversationId,
      type: "text",
      content: [values.content],
    })
      .then(() => {
        form.reset();
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.data
            : "An unexpected error occurred"
        );
      });
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await form.handleSubmit(handleSubmit)();
    }
  };

  return (
    <Card className="w-full p-2.5 rounded-lg border-t-2 bg-card shadow-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex items-end gap-3"
        >
          {/* Attachments button with subtle effect */}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:bg-muted-foreground/10 transition-colors"
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          {/* Input field with refined styling */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <TextareaAutosize
                    onKeyDown={handleKeyDown}
                    {...field}
                    ref={textareaRef}
                    minRows={1}
                    maxRows={5}
                    placeholder="Type a message..."
                    className="w-full resize-none rounded-2xl border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Send button with a distinct, active look */}
          <Button
            type="submit"
            size="icon"
            disabled={pending}
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </Form>
    </Card>
  );
}