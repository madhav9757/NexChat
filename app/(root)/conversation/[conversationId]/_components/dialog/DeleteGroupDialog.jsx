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

const DeleteGroupDialog = ({ conversationId, open, setOpen }) => {
    const [deleteGroup, pending] = useMutationState(api.conversation.deleteGroup)

    const handleRemove = async () => {
        try {
            await deleteGroup({ conversationId })
            toast.success('Group deleted successfully')
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
                    <AlertDialogTitle>Delete Group</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this group? You will lose the
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
                        {pending ? 'Removing...' : 'Remove'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteGroupDialog
