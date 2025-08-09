'use client'

import React from 'react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import useMutationState from '@/hooks/useMutationState'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import { api } from "@/convex/_generated/api"

// ✅ Zod validation schema
const addFriendSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email'),
})

const AddFileDialog = () => {
  const [createRequest, pending] = useMutationState(api.request.create);

  const form = useForm({
    resolver: zodResolver(addFriendSchema),
    defaultValues: { email: '' },
  })

  const handleSubmit = async (values) => {
    try {
      await createRequest({ email: values.email })
      form.reset()
      toast.success("Friend request send!")
    } catch (error) {
      toast.error(error instanceof ConvexError ? error.data : "ChutPagllu Error occured.");
    }
  }

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* DialogTrigger must wrap the button */}
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <UserPlus />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Add Friend</TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friends</DialogTitle>
          <DialogDescription>
            Send request to connect with your Friend
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        placeholder="friend@example.com"
                        {...field}
                        className="flex-1"
                      />
                    </FormControl>
                    <Button type="submit" disabled={pending}>
                      {pending ? "Sending..." : "Send Request"}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddFileDialog
