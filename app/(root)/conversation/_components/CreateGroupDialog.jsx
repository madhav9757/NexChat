'use client'

import { api } from '@/convex/_generated/api'
import useMutationState from '@/hooks/useMutationState'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from 'convex/react'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

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
import { toast } from 'sonner'
import { CirclePlusIcon, Cross, X } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

const CreateGroupFormSchema = z.object({
    name: z.string().min(1, { message: 'Field is required' }).max(50, { message: 'Name is too long' }),
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

    const unselectedFriends = useMemo(() => {
        if (!friends) return []
        return friends.filter((friend) => !members.includes(friend._id))
    }, [friends, members])

    const onSubmit = async (data) => {
        try {
            await createGroup(data)
            toast.success('Group created successfully')
            form.reset()
            setOpen(false)
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Unexpected error occurred')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button size="icon" variant="outline">
                            <CirclePlusIcon />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Create a new group</p>
                </TooltipContent>
            </Tooltip>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Group</DialogTitle>
                    <DialogDescription>
                        Give your group a name and select members to add.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Group name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Group Name" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Member selection */}
                        <FormField
                            control={form.control}
                            name="members"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Friends</FormLabel>
                                    <FormControl>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild disabled={unselectedFriends.length === 0}>
                                                <Button type="button" variant="outline" className="w-full justify-start">
                                                    Select Friends
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-full">
                                                {friends?.map((friend) => (
                                                    <DropdownMenuCheckboxItem
                                                        key={friend._id}
                                                        checked={members.includes(friend._id)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                form.setValue('members', [...members, friend._id])
                                                            } else {
                                                                form.setValue(
                                                                    'members',
                                                                    members.filter((id) => id !== friend._id)
                                                                )
                                                            }
                                                        }}
                                                        className="flex items-center gap-2 w-full p-2"
                                                    >
                                                        <Avatar className="w-6 h-6">
                                                            <AvatarImage src={friend.imgUrl} alt={friend.username} />
                                                            <AvatarFallback>
                                                                {friend.username?.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span>{friend.username}</span>
                                                    </DropdownMenuCheckboxItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {members && members.length > 0 ? (
                            <Card className="flex flex-row gap-4 overflow-x-auto p-3 w-full h-28">
                                {friends
                                    ?.filter((friend) => members.includes(friend._id))
                                    .map((member) => (
                                        <div key={member._id} className="flex flex-col items-center min-w-[64px]">
                                            <div className="relative">
                                                <Avatar className="w-12 h-12">
                                                    <AvatarImage src={member.imgUrl} alt={member.username} />
                                                    <AvatarFallback>
                                                        {member.username?.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        form.setValue(
                                                            "members",
                                                            members.filter((id) => id !== member._id)
                                                        )
                                                    }
                                                    className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow"
                                                >
                                                    <X className="h-3 w-3 text-red-500" />
                                                </button>
                                            </div>
                                            <span className="text-xs mt-1 truncate max-w-[60px]">
                                                {member.username}
                                            </span>
                                        </div>
                                    ))}
                            </Card>
                        ) : null}
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={pending}>
                                {pending ? 'Creating...' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateGroupDialog
