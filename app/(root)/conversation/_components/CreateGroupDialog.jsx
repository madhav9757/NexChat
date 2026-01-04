'use client'

import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from 'convex/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Plus, X, Users, Check, ChevronsUpDown } from 'lucide-react'

import { api } from '@/convex/_generated/api'
import useMutationState from '@/hooks/useMutationState'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

const CreateGroupFormSchema = z.object({
    name: z.string().min(1, { message: 'Group name is required' }).max(50, { message: 'Name is too long' }),
    members: z.array(z.string()).min(1, { message: 'At least one member is required' }),
})

const CreateGroupDialog = () => {
    const [open, setOpen] = useState(false)
    const friends = useQuery(api.friends.get)
    const [createGroup, pending] = useMutationState(api.conversation.createGroup)

    const form = useForm({
        resolver: zodResolver(CreateGroupFormSchema),
        defaultValues: {
            name: '',
            members: [],
        },
    })

    const members = form.watch('members')

    const onSubmit = async (data) => {
        try {
            await createGroup(data)
            toast.success('Group created')
            form.reset()
            setOpen(false)
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to create group')
        }
    }

    const toggleMember = (id) => {
        const currentMembers = form.getValues('members')
        if (currentMembers.includes(id)) {
            form.setValue('members', currentMembers.filter((m) => m !== id))
        } else {
            form.setValue('members', [...currentMembers, id])
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button 
                            size="icon" 
                            variant="outline" 
                            className="rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-sm"
                        >
                            <Plus className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p className="font-medium text-xs">New Group</p>
                </TooltipContent>
            </Tooltip>

            <DialogContent className="sm:max-w-[420px] rounded-[2rem] border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                <DialogHeader className="space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-center">
                        <DialogTitle className="text-xl font-bold">Create Group</DialogTitle>
                        <DialogDescription className="text-zinc-500 dark:text-zinc-400">
                            Build a new space for your team or friends.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">Group Identity</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="e.g. Design Team, Family" 
                                            {...field} 
                                            className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-500"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="members"
                            render={() => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">Add Members</FormLabel>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button 
                                                variant="outline" 
                                                className="w-full h-12 rounded-xl justify-between bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                                            >
                                                <span className="text-zinc-500 font-normal">
                                                    {members.length === 0 ? "Select friends..." : `${members.length} friends selected`}
                                                </span>
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[370px] max-h-60 overflow-y-auto rounded-xl shadow-xl">
                                            {friends?.length === 0 && (
                                                <p className="p-4 text-center text-sm text-zinc-500">No friends found</p>
                                            )}
                                            {friends?.map((friend) => (
                                                <DropdownMenuCheckboxItem
                                                    key={friend._id}
                                                    className="flex items-center gap-3 p-3 cursor-pointer transition-colors"
                                                    checked={members.includes(friend._id)}
                                                    onCheckedChange={() => toggleMember(friend._id)}
                                                >
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={friend.imgUrl} />
                                                        <AvatarFallback>{friend.username[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="flex-1 font-medium">{friend.username}</span>
                                                    {members.includes(friend._id) && <Check className="h-4 w-4 text-blue-600" />}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Animated Selection Preview */}
                        <div className="min-h-[80px]">
                            <AnimatePresence>
                                {members.length > 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-wrap gap-2 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-dashed border-zinc-200 dark:border-zinc-800"
                                    >
                                        {friends?.filter(f => members.includes(f._id)).map((member) => (
                                            <motion.div
                                                layout
                                                key={member._id}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                            >
                                                <Badge 
                                                    variant="secondary" 
                                                    className="pl-1 pr-2 py-1 flex items-center gap-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group shadow-sm"
                                                >
                                                    <Avatar className="h-5 w-5">
                                                        <AvatarImage src={member.imgUrl} />
                                                        <AvatarFallback className="text-[10px]">{member.username[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-xs font-semibold">{member.username}</span>
                                                    <X 
                                                        className="h-3 w-3 cursor-pointer text-zinc-400 group-hover:text-red-500 transition-colors" 
                                                        onClick={() => toggleMember(member._id)}
                                                    />
                                                </Badge>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <DialogFooter className="pt-2">
                            <Button 
                                type="submit" 
                                disabled={pending}
                                className="w-full h-12 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                            >
                                {pending ? 'Creating Group...' : 'Create Group'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateGroupDialog