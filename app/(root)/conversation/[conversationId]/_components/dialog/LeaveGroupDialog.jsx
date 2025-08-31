'use client'

import { api } from '@/convex/_generated/api'
import useMutationState from '@/hooks/useMutationState'
import { ConvexError } from 'convex/values'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { Delete } from 'lucide-react'

const LeaveGroupDialog = ({ conversationId, open, setOpen }) => {
    const [LeaveGroup, pending] = useMutationState(api.conversation.leaveGroup)

    const handleRemove = async () => {
        try {
            await LeaveGroup({ conversationId })
            toast.success('Group left successfully')
            setOpen(false)
        } catch (error) {
            toast.error(
                error instanceof ConvexError ? error.data : 'Unexpected error occurred'
            )
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Leave Group</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to leave this group? You will lose the
                        conversation history and won’t be able to chat unless you create a new group.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleRemove}
                        disabled={pending}
                        className="bg-destructive text-white hover:bg-destructive/90"
                    >
                        {pending ? 'Leaving...' : 'Leave'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LeaveGroupDialog
