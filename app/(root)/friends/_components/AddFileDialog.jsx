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
  TooltipProvider
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Loader2, UserPlus, Mail, Send } from 'lucide-react'
import useMutationState from '@/hooks/useMutationState'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import { api } from "@/convex/_generated/api"
import { motion, AnimatePresence } from 'framer-motion'

const addFriendSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Please enter a valid email address'),
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
      toast.success("Invitation Sent!", {
        description: `We've sent a request to ${values.email}`
      })
    } catch (error) {
      toast.error(error instanceof ConvexError ? error.data : "Unexpected error occurred.");
    }
  }

  return (
    <TooltipProvider>
      <Dialog onOpenChange={() => form.reset()}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button 
                size="icon" 
                variant="outline" 
                className="rounded-full h-11 w-11 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-95 shadow-sm"
              >
                <UserPlus className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-[10px] font-bold uppercase tracking-widest">
            Add Friend
          </TooltipContent>
        </Tooltip>

        <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-8 border-zinc-200 dark:border-zinc-800 shadow-2xl">
          <DialogHeader className="items-center text-center space-y-4">
            <div className="h-16 w-16 bg-blue-50 dark:bg-blue-950/30 rounded-3xl flex items-center justify-center">
              <Mail className="h-8 w-8 text-blue-600" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold tracking-tight">Expand your circle</DialogTitle>
              <DialogDescription className="text-zinc-500 dark:text-zinc-400">
                Enter your friend's email to start a secure connection.
              </DialogDescription>
            </div>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 mt-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 ml-1">
                      Recipient Email
                    </FormLabel>
                    <div className="relative group">
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          {...field}
                          className="h-12 pl-4 pr-12 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                      </FormControl>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-700 group-focus-within:text-blue-500 transition-colors">
                        <Send className="h-4 w-4" />
                      </div>
                    </div>
                    <FormMessage className="text-[11px] font-medium" />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                disabled={pending} 
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
              >
                <AnimatePresence mode="wait">
                  {pending ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      Send Request
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}

export default AddFileDialog