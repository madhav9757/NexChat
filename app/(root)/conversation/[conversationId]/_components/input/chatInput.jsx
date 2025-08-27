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

  const chatMessageSchema = z.object({
    content: z.string().min(1, { message: "This field can't be empty" }),
  });

  export default function ChatInput() {
    const textareaRef = useRef(null);

    const { conversationId } = useConversation();
    const [createMessage, pending ] = useMutationState(api.message.create);

    const form = useForm({
      resolver: zodResolver(chatMessageSchema),
      defaultValues: {
        content: "",
      },
    });

    const handleInputChange = (event) => {
      const { value, selectionStart } = event.target;

      if (selectionStart !== null) {
        form.setValue("content", value);
      }
    };
    const handleSubmit = async (values) => {
      await createMessage({
        conversationId,
        type: "text",
        content: [values.content],
      })
        .then(() => {
          form.reset();
        })
        .catch((error) => {
          toast.error(
            error instanceof ConvexError
              ? error.data
              : "An unexpected error occurred"
          );
        });
    };

    return (
      <Card className="w-full p-3 rounded-lg border-t bg-background">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex items-end gap-2"
          >
            {/* Attachments button */}
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="text-muted-foreground"
            >
              <Paperclip className="h-5 w-5" />
            </Button>

            {/* Input field */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => {
                return <FormItem className="flex-1">
                  <FormControl>
                    <TextareaAutosize
                      onKeyDown={ async e=> {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          await form.handleSubmit(handleSubmit)();
                        }
                      }}
                      {...field}
                      ref={textareaRef}
                      minRows={1}
                      maxRows={3}
                      {...field}
                      onChange={handleInputChange}
                      onClick={handleInputChange}
                      placeholder="Type a message..."
                      className="w-full resize-none rounded-xl border bg-muted px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </FormControl>
                </FormItem>
              }}
            />

            {/* Send button */}
            <Button type="submit" size="icon" disabled={pending}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </Form>
      </Card>
    );
  }
