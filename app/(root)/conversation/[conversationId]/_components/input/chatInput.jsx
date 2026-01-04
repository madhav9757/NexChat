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
import { Paperclip, SendHorizontal, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const chatMessageSchema = z.object({
  content: z.string().min(1, { message: "This field can't be empty" }),
});

export default function ChatInput() {
  const textareaRef = useRef(null);
  const { conversationId } = useConversation();
  const [createMessage, pending] = useMutationState(api.message.create);

  const form = useForm({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: { content: "" },
  });

  const content = form.watch("content");

  const handleSubmit = async (values) => {
    if (values.content.trim() === "") return;

    try {
      await createMessage({
        conversationId,
        type: "text",
        content: [values.content],
      });
      form.reset();
      textareaRef.current?.focus();
    } catch (error) {
      toast.error(
        error instanceof ConvexError ? error.data : "An unexpected error occurred"
      );
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await form.handleSubmit(handleSubmit)();
    }
  };

  return (
    <div className="px-4 pb-4 pt-2 bg-gradient-to-t from-background via-background to-transparent">
      <Card className="relative max-w-5xl mx-auto p-2 rounded-[24px] border border-border/50 bg-card/80 backdrop-blur-lg shadow-2xl ring-1 ring-black/5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex items-end gap-2"
          >
            {/* Action Group */}
            <div className="flex items-center">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

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
                      maxRows={6}
                      placeholder="Write a message..."
                      className="w-full resize-none bg-transparent px-2 py-2.5 text-sm focus-visible:outline-none disabled:opacity-50"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Send Button Logic */}
            <AnimatePresence mode="wait">
              {content.trim().length > 0 ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  key="send-button"
                >
                  <Button
                    type="submit"
                    size="icon"
                    disabled={pending}
                    className="h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 transition-all active:scale-90"
                  >
                    <SendHorizontal className="h-5 w-5" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  key="attach-button"
                >
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-full text-muted-foreground hover:bg-muted"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Form>
      </Card>
      
      {/* Footer Text */}
      <p className="text-[10px] text-center text-muted-foreground mt-2 font-medium uppercase tracking-[0.1em] opacity-50">
        End-to-End Encrypted
      </p>
    </div>
  );
}